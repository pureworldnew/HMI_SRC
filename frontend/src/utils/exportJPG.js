import domToImage from 'dom-to-image';


/**
 * [description] - convert html element into jpg image
 * @param  {[type]} node [description] - html element to convert
 * @param  {[type]} name [description] - image name
 */
export default async function (node, name) {
  let noLegend = node.querySelector('button');
  if(noLegend) noLegend.style.display = 'none';

  let image = await domToImage.toJpeg(node);
  let link = document.createElement('a');
  link.download = `${name ? name : 'image'}.jpg`;
  link.href = image;
  link.click();

  if(noLegend) noLegend.style.display = null;
}
