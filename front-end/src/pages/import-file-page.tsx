import { useState } from "react"
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/dropzone';
import { Button } from "@/components/ui/button";

export default function ImportFilePage() {
  const [files, setFiles] = useState<File[] | undefined>()
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleDrop = async (files: File[]) => {
    console.log(files)
    setIsUploading(true)
    setUploadProgress(0)

    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      setUploadProgress(i)
    }

    setFiles(files)
    setIsUploading(false)
    setUploadProgress(0)
  }

  // const onPress = async () => {
  //   //chamada para api
  // }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">Upload the class content file.</h1>

      <Dropzone
        maxSize={1024 * 1024 * 10}
        minSize={1024}
        maxFiles={10}
        accept={{ "application/pdf": [] }}
        onDrop={handleDrop}
        src={files}
        onError={console.error}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
      >
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
      <Button>Import File</Button>
      </div>
    </div>
  )
}
