import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// const pdfURL =
//   "https://enduring-hornet-413.convex.cloud/api/storage/538848f3-05a5-4961-aa11-e4805cbda87c";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const pdfURL = searchParams.get("pdfURL");

  const response = await fetch(pdfURL);
  const blob = await response.blob();

  // Load the PDF
  const loader = new WebPDFLoader(blob);
  const docs = await loader.load();

  let pdfText = "";
  docs.forEach((doc) => {
    pdfText += doc.pageContent + " ";
  });

//   const text = `Hi.\n\nI'm Harrison.\n\nHow? Are? You?\nOkay then f f f f.
// This is a weird text to write, but gotta test the splittingggg some how.\n\n
// Bye!\n\n-H.This is just a test for hte following. and also it is not for fun. it. is. for. testing purposes.`;

  // Split Text in Small Chunks
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const texts = await textSplitter.createDocuments([pdfText]);

  let docOutput = [];
  texts.forEach((text) => {
    docOutput.push(text.pageContent);
  });

  return NextResponse.json({ result: docOutput });
}
