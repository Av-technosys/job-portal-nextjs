import { Button, Stack, Typography } from "@/components";
import { BACK_TO_ADMIN_URL } from "@/constants";
import { EXCEL_UPLOAD_PAGE_CONFIG } from "@/constants/excelUpload";
import { getErrorMessageFromAPI } from "@/helper";
import { useNotification } from "@/services";
import { useCreateQuestionInfo } from "@/services/useCreateQuestion";
import { useRouter } from "next/router";
import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelUploader = () => {
  const [fileName, setFileName] = React.useState("");
  const { showNotification } = useNotification();
  const [exceljsondata, setexceljsondata] = useState<any>();

  const router = useRouter();
  const { id } = router.query;

  const {
    HEADER_TEXT,
    SUMMERY_TEXT,
    SUBMIT_BUTTON,
    BACK_BUTTON,
    SAMPLE_EXCEL_BUTTON,
  } = EXCEL_UPLOAD_PAGE_CONFIG;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        // Get first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const updatedJsonData = jsonData.map((item: any) => ({
          ...item,
          subject: id,
        }));
        setexceljsondata(updatedJsonData);
      } catch (error) {
        alert(
          "Error reading Excel file. Please make sure it's a valid Excel file."
        );
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const CreateQuestionInfoMutate = useCreateQuestionInfo({
    mutationConfig: {
      onSuccess: () => {
        alert("Excel File Send Successfully...");
      },
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
      },
    },
  });

  const submithandler = () => {
    CreateQuestionInfoMutate.mutate({ data: exceljsondata });
  };

  return (
    <>
      <Stack
        stackProps={{
          padding: 4,
          className: "max-w-6xl mx-auto border border-gray-400 mt-4 rounded-md",
        }}
      >
        <Stack stackProps={{ direction: "column", spacing: 3 }}>
          <Typography {...HEADER_TEXT} />
          <Typography {...SUMMERY_TEXT} />
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {fileName && (
            <>
              <Stack
                stackProps={{
                  padding: 2,
                  className:
                    "rounded-md  border border-green-500 text-green-500",
                }}
              >
                File Uploaded:{fileName}
              </Stack>
            </>
          )}
          <Stack stackProps={{ direction: "row", spacing: 2 }}>
            <Button
              onClick={() => router.push(BACK_TO_ADMIN_URL)}
              {...BACK_BUTTON}
            />
            <Button
              onClick={() =>
                router.push(
                  "https://docs.google.com/spreadsheets/d/1KpnKijVJ6aIOaWkwbaarwgKoAiRJ2UfGN2w22_91d7g/edit?usp=sharing"
                )
              }
              {...SAMPLE_EXCEL_BUTTON}
            />
            <Button onClick={submithandler} {...SUBMIT_BUTTON} />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default ExcelUploader;
