import { useState, ChangeEvent, DragEvent } from "react";
import { ImageProps } from "../types/type";

const MAX_IMAGES = 2;
const MAX_SIZE = 4;
const MAX_FILE_SIZE = MAX_SIZE * 1024 * 1024;

export const useImageUpload = () => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [isDragging, setDragging] = useState<boolean>(false);

  // setImages에 이미지 추가하는 함수
  const addImages = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const filterFiles = imageFiles.filter((file) => file.size <= MAX_FILE_SIZE);
    const newImages: ImageProps[] = filterFiles.slice(0, MAX_IMAGES - images.length).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages].slice(0, MAX_IMAGES));
  };

  // 드래그 할 때
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  // 드래그 끝날 때
  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  // 드래그 후 놓을 때
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    addImages(files);
  };

  // 이미지 선택
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      addImages([...files]);
    }
  };

  // 이미지 삭제
  const removeImage = (index: number) => {
    setImages((prev: ImageProps[]) => prev.filter((_, idx) => idx !== index));
  };
  return {
    MAX_IMAGES,
    MAX_SIZE,
    images,
    setImages,
    isDragging,
    handleDragOver,
    handleDragEnd,
    handleDrop,
    handleFileChange,
    removeImage,
  };
};
