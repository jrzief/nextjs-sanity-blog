
import BlockContent from '@sanity/block-content-to-react';
import HighlightCode from './HighlightCode';
import { urlFor } from '../lib/api';

const serializers = {
  types: {
    code: ({node: {language, code, filename}}) => {
      return (
        <HighlightCode language={language}>
          {code}
          <div className="code-filename">{filename}</div>
        </HighlightCode>
      )  
       {/*  <pre data-language={props.node.language}>
          <code>{props.node.code}</code>
          <p>{props.node.filename}</p>
        </pre> */}
      // )
    },
    image: ({node: {asset, alt, position = 'center'}}) => {
      let style = {};

     /*  if (position === 'left') {
        style.float = position;
        style.marginRight = '30px';
      }
      if (position === 'right') {
        style.float = position;
        style.marginLeft = '30px';
      } */

      return (
       <div className={`blog-image blog-image-${position}`}>
         <img src={urlFor(asset).height(300).fit('max').url()}/>
         <div className="image-alt">{alt}</div>
       </div>
      )
    }
  }
}


const BlogContent = ({content}) => 
  <BlockContent
    //imageOptions={{w: 320, h: 240, fit: 'max'}}
    serializers={serializers}
    blocks={content}
  />

export default BlogContent;


