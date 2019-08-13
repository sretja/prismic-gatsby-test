<h1 align="center">
  Prismic with Gatsby.js
</h1>

Example website demo that shows how to use the new Gatsby plugin for Prismic.

It showcases how a website for a coffee store could be designed and built, as well as the techniques you will have to use to generate pages dynamically when using a Prismic repository as a data source, while also being able to use the **preview** and **release** features.

Based on the gatsby default starter and uses the [gatsby-source-prismic-graphql](https://github.com/birkir/gatsby-source-prismic-graphql) plugin for creating pages that can be drafted and previewed. Refer to its documentation for more details on how to use it.

A deployment demo is available in Netlify: https://https://mad-coffee.netlify.com

### Running locally 
```
gatsby develop
```

### Building

```
gatsby build
```

### Serving built folder
```
gatsby serve
```
 
### Add a new component / slice for Landing pages

#### In Prismic
- Visit [the Landingpage Edit in the Masks Section in Prismic](https://mad-example.prismic.io/masks/landingpage.json/)
- Add your new slice

#### In Code
- Add your new component to the [Slices folder](https://github.com/createdbymad/prismic-gatsby-test/blob/master/src/components/slices)
 - Use the [TextBlock component](https://github.com/createdbymad/prismic-gatsby-test/blob/master/src/components/slices/TextBlock.js) as example.
 - Afterwards add the component to the [Index Page](https://github.com/createdbymad/prismic-gatsby-test/blob/master/src/pages/index.js).
   - Import it, Add a prismic query for the new slice (use the already existing query as example), add it to the switch case statement in the RenderSlices method.
