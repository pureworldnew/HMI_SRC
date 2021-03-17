import pptxgen from 'pptxgenjs';

// for search: exportPPTX
export default (data, type) => {
  const pptx = new pptxgen();
  const date = new Date().getTime();
  const fileName = `presentation_${date}.pptx`;
  let slide = [];

  if (!data || !Array.isArray(data)) {
    return console.warn('Type of data is incorrect for export in PPTX');
  }

  data.forEach((key) => {
    slide = [
      ...slide,
      pptx
        .addSlide(key.title)
        .addText(key.title, {
          x: 1,
          y: 1,
          w: '80%',
          h: 1,
          fontSize: 24,
          align: 'left'
        })
        .addText(key.content, {
          x: 1,
          y: 2,
          w: '80%',
          h: 1,
          fontSize: 16,
          //fill: pptx.SchemeColor.background2,
          align: 'left'
        })
    ];

  });

  return pptx.writeFile(fileName);
};
