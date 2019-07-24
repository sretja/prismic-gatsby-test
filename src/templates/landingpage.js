import React from 'react'
import { Helmet } from 'react-helmet'
import { CTABanner, FeaturedItems, NumberedItems, Separator, TextBlock } from '../components/slices'
import { linkResolver } from '../utils/linkResolver'
import { RichText } from 'prismic-reactjs'
import Layout from '../components/layouts'

export const query = graphql`
query LandingpageQuery($uid: String) {
  prismic{
    allLandingpages(uid: $uid){
      edges{
        node{
          _meta{
            uid
            id
          }
          title
          body {
            __typename
            ... on PRISMIC_LandingpageBodyCta_banner {
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
            ... on PRISMIC_LandingpageBodySeparator {
              type
            }
            ... on PRISMIC_LandingpageBodyText_block {
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
}`

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

    <div className="homepage-slices-wrapper">
      <RenderSlices slices={home.body} />
    </div>
  </React.Fragment>
);

export default ({ data }) => {
  // Required check for no data being returned
  const doc = data.prismic.allLandingpages.edges.slice(0,1).pop();
  if(!doc) return null;

  return(
    <Layout>
      <RenderBody home={doc.node} />
    </Layout>
  )

}

