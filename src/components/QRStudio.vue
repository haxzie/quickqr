<script setup lang="ts">
import { DownloadIcon, ImagePlusIcon } from "lucide-vue-next";
import { QrcodeCanvas } from "qrcode.vue";
import { ref, computed } from "vue";
import DropDown from "./DropDown.vue";
import { QROptions } from "../utils/options";

interface ImageOptions {
  src: string;
  width: number;
  height: number;
}

const qrData = ref("");
const selectedOption = ref(QROptions[0]); // Default to URL
const imageOptions = ref<null | ImageOptions>(null);

const placeholder = computed(
  () => selectedOption.value?.placeholder || "Enter text"
);

const handleOptionSelect = (option: (typeof QROptions)[0]) => {
  selectedOption.value = option;
};

const finalQRValue = computed(() => {
  if (!qrData.value) return "https://google.com";
  const processValue = selectedOption.value?.processValue;
  return processValue ? processValue(qrData.value) : qrData.value;
});

const downloadQR = () => {
  // Get the canvas element
  const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement;

  if (canvas) {
    // Create a download link
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvas.toDataURL("image/png");

    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

const uploadImage = () => {
  imageOptions.value = null;
  // Create file input element
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = 100;
        canvas.height = 100;

        // Fill white background
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 100, 100);

        // Calculate image dimensions to fit in 40x40 (centered)
        const maxSize = 100 - 10;
        let { width, height } = img;

        // Scale image to fit within maxSize while maintaining aspect ratio
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }

        // Center the image (5px padding + centering within 40x40)
        const x = 5 + (maxSize - width) / 2;
        const y = 5 + (maxSize - height) / 2;

        // Draw image on canvas
        ctx.drawImage(img, x, y, width, height);

        // Convert canvas to blob
        canvas.toBlob((blob) => {
          if (blob) {
            const reader = new FileReader();
            reader.onload = () => {
              imageOptions.value = {
                src: reader.result as string,
                width: 50,
                height: 50,
              };
              console.log(imageOptions.value);
            };
            reader.readAsDataURL(blob);
          }
        }, "image/png");
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Trigger file picker
  input.click();
};
</script>

<template>
  <div
    class="flex flex-col w-full md:w-[480px] bg-white border-1 border-gray-100 rounded-lg shadow-sm overflow-hidden"
  >
    <!-- Header -->
    <div
      class="h-[58px] flex flex-row gap-4 items-center pl-2 pr-2 border-b-1 border-gray-100 bg-white"
    >
      <DropDown
        :options="QROptions"
        :selectedOption="selectedOption!"
        @selectOption="handleOptionSelect"
      />
      <input
        type="text"
        :placeholder="placeholder"
        class="flex-1 text-sm outline-none h-full min-w-0"
        v-model="qrData"
        autofocus
      />
      <div class="flex gap-4">
        <button
          @click="uploadImage"
          class="h-[38px] w-[38px] flex flex-row items-center justify-center rounded-md text-sm hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <ImagePlusIcon :size="18" />
        </button>
        <button
          @click="downloadQR"
          class="h-[38px] w-[38px] flex flex-row items-center justify-center rounded-md text-white text-sm bg-blue-500 hover:bg-blue-700 transition-colors cursor-pointer"
        >
          <DownloadIcon :size="18" />
        </button>
      </div>
    </div>
    <!-- Body -->
    <div
      class="h-[400px] flex flex-col items-center justify-center p-4 bg-white"
    >
      <QrcodeCanvas
        :value="finalQRValue"
        level="H"
        :size="256"
        id="qr-canvas"
        :image-settings="imageOptions ?? undefined"
      />
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
