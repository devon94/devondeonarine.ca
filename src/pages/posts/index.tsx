import Layout from '@devondeonarine/components/layout'
import { Post } from '@devondeonarine/models/Post'
import { request, gql } from 'graphql-request'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React from 'react'

interface Props {
    posts: Post[]
}

const Posts: React.FunctionComponent<Props> = (props) => {
    const { posts } = props
    const heroPost = posts[0]
    const morePosts = posts.slice(1)
    return (
        <Layout>
            <Head>
                <title>Devon Deonarine</title>
            </Head>
        </Layout>

    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = gql`
        {
            posts {
                title
                content
                slug
            }
        }
    `
    console.log(process.env.STRAPI_URL)
    const data = await request<{ posts: Post[] }>(`${process.env.STRAPI_URL}/graphql`, query)

    return {
        props: { posts: data.posts }
    }
}

export default Posts