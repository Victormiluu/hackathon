import { useState } from "react"
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/dropzone';
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function ImportFilePage() {
  const [file, setFile] = useState<File | undefined>()
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleDrop = async (droppedFiles: File[]) => {
    if (!droppedFiles || droppedFiles.length === 0) return;

    const selectedFile = droppedFiles[0]; // Pega apenas o primeiro arquivo
    setIsUploading(true)
    setUploadProgress(0)

    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      setUploadProgress(i)
    }

    setFile(selectedFile)
    setIsUploading(false)
    setUploadProgress(0)
  }

  const onPress = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('pdf', file); // Nome do campo esperado pela API

    const BaseURI = "https://capp-hackathon-backend-01.calmstone-15122a91.eastus.azurecontainerapps.io";

    try {
      const response = await axios.post(`${BaseURI}/question-generation/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });

      console.log("Arquivo enviado com sucesso", response.data);
    } catch (error) {
      console.error("Erro ao enviar o arquivo:", error);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">Upload the class content file.</h1>

        <Dropzone
          maxSize={1024 * 1024 * 10}
          minSize={1024}
          maxFiles={1}
          accept={{ "application/pdf": [] }}
          onDrop={handleDrop}
          src={file ? [file] : undefined} // Dropzone ainda espera um array
          onError={console.error}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
        >
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>

        <Button onClick={onPress} disabled={!file}>Import File</Button>
      </div>
    </div>
  )
}
