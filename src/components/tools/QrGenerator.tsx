import { useState, useRef, useEffect } from "react";
import QRCodeStyling, {
  DotType,
  CornerSquareType,
  CornerDotType,
} from "qr-code-styling";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Download,
  Link as LinkIcon,
  Type,
  Mail,
  Wifi,
  QrCode,
  Palette,
  Image as ImageIcon,
  MessageCircle,
  X,
  Shapes,
} from "lucide-react";
import { ColorPicker } from "@/components/ui/color-picker";

const QrGenerator = () => {
  const { t } = useLanguage();
  const [qrType, setQrType] = useState("url");
  const [content, setContent] = useState("https://leonmatias.dev");

  // Specific state for complex types
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState("WPA");

  // Styling state
  const [dotType, setDotType] = useState<DotType>("square");
  const [cornerSquareType, setCornerSquareType] = useState<CornerSquareType>("square");
  const [cornerDotType, setCornerDotType] = useState<CornerDotType>("square");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [logoUrl, setLogoUrl] = useState("");
  const [logoSize, setLogoSize] = useState(0.4);
  const [logoMargin, setLogoMargin] = useState(10);

  const qrCode = useRef<QRCodeStyling | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      qrCode.current = new QRCodeStyling({
        width: 300,
        height: 300,
        image: logoUrl,
        dotsOptions: {
          color: fgColor,
          type: dotType,
        },
        cornersSquareOptions: {
          type: cornerSquareType,
          color: fgColor,
        },
        cornersDotOptions: {
          type: cornerDotType,
          color: fgColor,
        },
        backgroundOptions: {
          color: bgColor,
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: logoMargin,
          imageSize: logoSize
        },
      });
      qrCode.current.append(ref.current);
    }
  }, []);

  useEffect(() => {
    if (!qrCode.current) return;
    qrCode.current.update({
      data: content,
      image: logoUrl,
      dotsOptions: {
        color: fgColor,
        type: dotType,
      },
      cornersSquareOptions: {
        type: cornerSquareType,
        color: fgColor,
      },
      cornersDotOptions: {
        type: cornerDotType,
        color: fgColor,
      },
      backgroundOptions: {
        color: bgColor,
      },
      imageOptions: {
        margin: logoMargin,
        imageSize: logoSize
      }
    });
  }, [content, fgColor, bgColor, dotType, cornerSquareType, cornerDotType, logoUrl, logoSize, logoMargin]);

  useEffect(() => {
    if (qrType === "whatsapp") {
      setContent(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`);
    } else if (qrType === "wifi") {
      setContent(`WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};;`);
    }
  }, [whatsappNumber, whatsappMessage, wifiSsid, wifiPassword, wifiEncryption, qrType]);

  const handleTypeChange = (value: string) => {
    setQrType(value);
    if (value === "url") setContent("https://");
    if (value === "text") setContent("");
    if (value === "email") setContent("mailto:");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLogoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const removeLogo = () => {
    setLogoUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const downloadQr = (format: "png" | "svg" | "jpeg" | "webp") => {
    if (!qrCode.current) return;
    qrCode.current.download({ extension: format });
    toast.success(`QR Code downloaded as ${format.toUpperCase()}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>{t("tools.qr-generator.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content"><QrCode className="w-4 h-4 mr-2 hidden sm:inline"/>Content</TabsTrigger>
              <TabsTrigger value="style"><Palette className="w-4 h-4 mr-2 hidden sm:inline"/>Style</TabsTrigger>
              <TabsTrigger value="shapes"><Shapes className="w-4 h-4 mr-2 hidden sm:inline"/>Shapes</TabsTrigger>
              <TabsTrigger value="logo"><ImageIcon className="w-4 h-4 mr-2 hidden sm:inline"/>Logo</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6 mt-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant={qrType === "url" ? "default" : "outline"} onClick={() => handleTypeChange("url")} className="justify-start"><LinkIcon className="w-4 h-4 mr-2"/> URL</Button>
                  <Button variant={qrType === "text" ? "default" : "outline"} onClick={() => handleTypeChange("text")} className="justify-start"><Type className="w-4 h-4 mr-2"/> Text</Button>
                  <Button variant={qrType === "whatsapp" ? "default" : "outline"} onClick={() => handleTypeChange("whatsapp")} className="justify-start"><MessageCircle className="w-4 h-4 mr-2"/> WhatsApp</Button>
                  <Button variant={qrType === "email" ? "default" : "outline"} onClick={() => handleTypeChange("email")} className="justify-start"><Mail className="w-4 h-4 mr-2"/> Email</Button>
                  <Button variant={qrType === "wifi" ? "default" : "outline"} onClick={() => handleTypeChange("wifi")} className="justify-start"><Wifi className="w-4 h-4 mr-2"/> WiFi</Button>
                </div>
              </div>

              {qrType === "url" && (
                <div className="space-y-2">
                  <Label>Website URL</Label>
                  <Input placeholder="https://example.com" value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
              )}
              {qrType === "text" && (
                <div className="space-y-2">
                  <Label>Text Content</Label>
                  <Input placeholder="Enter text" value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
              )}
              {qrType === "email" && (
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input placeholder="name@example.com" value={content.replace("mailto:", "")} onChange={(e) => setContent(`mailto:${e.target.value}`)} />
                </div>
              )}
              {qrType === "whatsapp" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input placeholder="15551234567" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Input placeholder="Hello!" value={whatsappMessage} onChange={(e) => setWhatsappMessage(e.target.value)} />
                  </div>
                </div>
              )}
              {qrType === "wifi" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>SSID</Label>
                    <Input placeholder="Network Name" value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input type="password" placeholder="Password" value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Encryption</Label>
                    <Select value={wifiEncryption} onValueChange={setWifiEncryption}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WPA">WPA/WPA2</SelectItem>
                        <SelectItem value="WEP">WEP</SelectItem>
                        <SelectItem value="nopass">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="style" className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <ColorPicker label="Foreground Color" value={fgColor} onChange={setFgColor} />
                <ColorPicker label="Background Color" value={bgColor} onChange={setBgColor} />
              </div>
            </TabsContent>

            <TabsContent value="shapes" className="space-y-6 mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Dots Style</Label>
                  <Select value={dotType} onValueChange={(val: DotType) => setDotType(val)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="dots">Dots</SelectItem>
                      <SelectItem value="rounded">Rounded</SelectItem>
                      <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                      <SelectItem value="classy">Classy</SelectItem>
                      <SelectItem value="classy-rounded">Classy Rounded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Corner Square Style</Label>
                  <Select value={cornerSquareType} onValueChange={(val: CornerSquareType) => setCornerSquareType(val)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="dot">Dot</SelectItem>
                      <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Corner Dot Style</Label>
                  <Select value={cornerDotType} onValueChange={(val: CornerDotType) => setCornerDotType(val)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="dot">Dot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="logo" className="space-y-6 mt-4">
              <div className="space-y-2">
                <Label>Upload Logo</Label>
                <div className="flex gap-2">
                  <Input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" />
                  {logoUrl && (
                    <Button variant="destructive" size="icon" onClick={removeLogo}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              {logoUrl && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Logo Size</Label>
                    <Slider
                      value={[logoSize * 100]}
                      max={100}
                      step={1}
                      onValueChange={(val) => setLogoSize(val[0] / 100)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Logo Margin</Label>
                    <Slider
                      value={[logoMargin]}
                      max={50}
                      step={1}
                      onValueChange={(val) => setLogoMargin(val[0])}
                    />
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-b-lg">
            <div className="bg-white p-4 rounded-lg shadow-sm" ref={ref} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Button onClick={() => downloadQr("png")} className="w-full">
            <Download className="w-4 h-4 mr-2" /> Download PNG
          </Button>
          <Button onClick={() => downloadQr("svg")} variant="outline" className="w-full">
            <Download className="w-4 h-4 mr-2" /> Download SVG
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QrGenerator;
