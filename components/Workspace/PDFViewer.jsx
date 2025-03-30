import React from 'react'

const PDFViewer = ({fileURL}) => {
  return (
    <div>
        <iframe src={fileURL} height={"100vh"} width={"100%"} className='h-[100vh] w-[100%]'>
        </iframe>
    </div>
  )
}

export default PDFViewer
