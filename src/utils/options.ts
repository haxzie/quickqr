import {
  GlobeIcon,
  PhoneIcon,
  MailIcon,
  MessageCircleIcon,
  IndianRupeeIcon,
  MapPinnedIcon,
  TextIcon,
  WifiIcon,
  type LucideProps,
} from "lucide-vue-next";
import { type FunctionalComponent } from "vue";

export interface QROption {
  name: string;
  icon: FunctionalComponent<LucideProps, {}, any, {}>;
  processValue?: (value: string) => string;
  placeholder: string;
}

export const QROptions: QROption[] = [
  {
    name: "Website",
    icon: GlobeIcon,
    processValue: (value: string) => {
      return value.startsWith('http') ? value : `https://${value}`;
    },
    placeholder: "Enter the URL",
  },
  {
    name: "Text",
    icon: TextIcon,
    processValue: (value: string) => value,
    placeholder: "Enter your text",
  },
  {
    name: "Phone",
    icon: PhoneIcon,
    processValue: (value: string) => `tel:${value}`,
    placeholder: "Enter the phone number",
  },
  {
    name: "Email",
    icon: MailIcon,
    processValue: (value: string) => `mailto:${value}`,
    placeholder: "Enter the email",
  },
  {
    name: "Whatsapp",
    icon: MessageCircleIcon,
    processValue: (value: string) => `https://wa.me/${value}`,
    placeholder: "Enter whatsapp number",
  },
  {
    name: "Location",
    icon: MapPinnedIcon,
    processValue: (value: string) => `geo:${value}`,
    placeholder: "Enter lat,long (eg: 12.953,77.587)",
  },
  {
    name: "WIFI",
    icon: WifiIcon,
    processValue: (value: string) => {
      const [name, password] = value.split(":");
      return `WIFI:T:WPA;S:${name || ""};P:${password || ""};H:false;;`;
    },
    placeholder: "Enter Name:Password (eg: Jhon:1234556)",
  },
  {
    name: "UPI",
    icon: IndianRupeeIcon,
    processValue: (value: string) => `upi://pay?pa=${value}`,
    placeholder: "Enter your UPI Id (eg: jhon@icici)",
  },
];