import React from 'react'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../utils/linkResolver'
import { graphql } from 'gatsby';
import { CTABanner, FeaturedItems, NumberedItems, Separator, TextBlock } from '../components/slices'

import Layout from '../components/layouts'

export const query = graphql`
{
  prismic{
    allHomepages(uid:null){
      edges{
        node{
          _meta{
            uid
            id
            type
          }
          title
          banner_image
          banner_text
          body {
            __typename
            ... on PRISMIC_HomepageBodyCta_banner {
              type
              primary {
                image_banner
                banner_title
                banner_text
                cta_label
                cta_link {
                  __typename
                  ... on PRISMIC__ExternalLink {
                    url
                  }
                }
              }
            }
            ... on PRISMIC_HomepageBodySeparator {
              type
            }
            ... on PRISMIC_HomepageBodyText_block {
              type
              primary {
                title1
                paragraph
              }
            }
          }
        }
      }
    }
  }
}
`

const RenderSlices = ({ slices }) => {
  return slices.map((slice, index) => {
    const res = (() => {
      switch(slice.type) {
        case 'cta_banner': return (
          <div key={index} className="homepage-slice-wrapper">
            <CTABanner slice={slice} />
          </div>
        )

        case 'separator': return (
          <div key={index} className="homepage-slice-wrapper">
            <Separator />
          </div>
        )

        case 'text_block': return (
          <div key={index} className="homepage-slice-wrapper">
            <TextBlock slice={slice} />
          </div>
        )

        default: return
      }
    })();
    return res;
  })
}

const RenderBody = ({ home }) => (
  <React.Fragment>
    <header className="homepage-header">
      <div className="l-wrapper">
        <div className="homepage-header-title">
          {RichText.render(home.title, linkResolver)}
        </div>
      </div>
    </header>

    <section className="homepage-banner">
      <img className="homepage-banner-image" src={home.banner_image.url} alt={home.banner_image.alt} />
      <div className="homepage-banner-box-wrapper">
        <div className="homepage-banner-box">
        {RichText.render(home.banner_text, linkResolver)}
        </div>
      </div>
    </section>

    <div className="homepage-slices-wrapper">
      <RenderSlices slices={home.body} />
    </div>
  </React.Fragment>
);

export default ({ data }) => {
  // Required check for no data being returned
  const doc = data.prismic.allHomepages.edges.slice(0,1).pop();
  if(!doc) return null;
  
  return(
    <Layout>
      <RenderBody home={doc.node} />
    </Layout>
  )

}

