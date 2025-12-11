import {useState, useRef, useEffect} from "react";
import {useLanguage} from "@/contexts/LanguageContext";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
  User,
  Building,
  Briefcase,
  Phone,
  Mail,
  Globe,
  Linkedin,
  Github,
  Palette,
  FileText,
  Brush,
  X,
  Copy,
  Image as ImageIcon,
  MapPin,
  Bold,
  Italic,
  Underline,
  ArrowUp,
  ArrowDown,
  MessageCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Slider} from "@/components/ui/slider";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import BrowserMockup from "../ui/BrowserMockup";
import {countries} from "@/data/countries";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {cn} from "@/lib/utils";
import { ColorPicker } from "@/components/ui/color-picker";

type FieldName =
  'name'
  | 'role'
  | 'company'
  | 'phone'
  | 'email'
  | 'website'
  | 'linkedin'
  | 'github'
  | 'whatsapp'
  | 'image'
  | 'countryName';

const SignatureGenerator = () => {
  const {t} = useLanguage();
  const [formData, setFormData] = useState({
    name: "Leon Matias",
    role: "Senior Full Stack Developer",
    company: "Your Company",
    phone: "123456789",
    countryName: "United States",
    email: "your.email@example.com",
    website: "yourwebsite.com/very/long/url/that/needs/truncating",
    linkedin: "https://www.linkedin.com/in/leon-matias/",
    github: "https://github.com/leon-matias",
    image: "https://avatars.githubusercontent.com/u/10000",
  });

  const [styles, setStyles] = useState({
    primaryColor: "#000000",
    textColor: "#333333",
    fontSize: 12,
    imageRadius: 50,
    iconSize: 24,
    socialIconSpacing: 10,
    textStyles: {
      name: {isBold: true, isItalic: false, isUnderline: false},
      role: {isBold: false, isItalic: false, isUnderline: false},
      company: {isBold: false, isItalic: false, isUnderline: false},
      phone: {isBold: false, isItalic: false, isUnderline: false},
      countryName: {isBold: false, isItalic: false, isUnderline: false},
      email: {isBold: false, isItalic: false, isUnderline: false},
      website: {isBold: false, isItalic: false, isUnderline: false},
    }
  });

  const [fieldOrder, setFieldOrder] = useState<FieldName[]>([
    'name', 'role', 'company', 'countryName', 'phone', 'email', 'website', 'linkedin', 'github', 'whatsapp', 'image'
  ]);
  const [template, setTemplate] = useState("classic");
  const [activeInput, setActiveInput] = useState("");
  const [activeTab, setActiveTab] = useState("data");

  const signatureRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          // Create an image object to load the file
          const img = new Image();
          img.onload = () => {
            // Create a canvas to resize
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 150; // Max width sufficient for signature
            const MAX_HEIGHT = 150;
            let width = img.width;
            let height = img.height;

            // Calculate new dimensions
            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }

            canvas.width = width;
            canvas.height = height;

            // Draw and compress
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0, width, height);
                // Convert to JPEG with 0.7 quality to reduce size significantly
                const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                setFormData((prev) => ({...prev, image: dataUrl}));
            }
          };
          img.src = event.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearInput = (name: string) => {
    setFormData((prev) => ({...prev, [name]: ""}));
  };

  const copySignatureToClipboard = () => {
    if (!signatureRef.current) return;

    const html = signatureRef.current.innerHTML;
    const text = signatureRef.current.innerText;

    const copy = async () => {
      try {
        const htmlBlob = new Blob([html], { type: 'text/html' });
        const textBlob = new Blob([text], { type: 'text/plain' });

        const clipboardItem = new ClipboardItem({
          'text/html': htmlBlob,
          'text/plain': textBlob,
        });

        await navigator.clipboard.write([clipboardItem]);
        toast.success(t("tools.signature-generator.copied.signature"));
      } catch (error) {
        console.error('Failed to copy HTML to clipboard, falling back to text.', error);
        try {
            await navigator.clipboard.writeText(text);
            toast.success(t("tools.signature-generator.copied.signature") + " (text only)");
        } catch (fallbackError) {
            console.error('Failed to copy text to clipboard.', fallbackError);
            toast.error('Failed to copy signature.');
        }
      }
    };

    copy();
  };

  const selectedCountry = countries.find(c => c.name === formData.countryName);
  const countryCode = selectedCountry ? selectedCountry.code : '';
  const fullPhoneNumber = `+${countryCode}${formData.phone}`;

  const getTextStyle = (fieldName: keyof typeof styles.textStyles): React.CSSProperties => {
    const fieldStyles = styles.textStyles[fieldName];
    return {
      fontWeight: fieldStyles.isBold ? 'bold' : 'normal',
      fontStyle: fieldStyles.isItalic ? 'italic' : 'normal',
      textDecoration: fieldStyles.isUnderline ? 'underline' : 'none',
    };
  };

  const moveField = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...fieldOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;
    [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
    setFieldOrder(newOrder);
  };

  const getIconUrl = (iconName: string, color: string) => {
    const hex = color.replace('#', '');
    return `https://img.icons8.com/ios-filled/50/${hex}/${iconName}.png`;
  };

  const renderOrderedFields = () => {
    const socialFields = ['linkedin', 'github', 'whatsapp'];
    const renderedSocial = new Set();

    const fields = fieldOrder.map((fieldName) => {
      if (!formData[fieldName as keyof typeof formData] || renderedSocial.has(fieldName)) return null;

      if (socialFields.includes(fieldName)) {
        renderedSocial.add('linkedin');
        renderedSocial.add('github');
        renderedSocial.add('whatsapp');

        const socialIcons = [
            fieldOrder.includes('linkedin') && formData.linkedin ? (
                <a key="linkedin" href={formData.linkedin} style={{ textDecoration: 'none', display: 'inline-block' }}>
                    <img src="https://img.icons8.com/ios-filled/50/0077B5/linkedin.png" alt="LinkedIn" width={styles.iconSize} height={styles.iconSize} style={{ display: 'block', width: `${styles.iconSize}px`, height: `${styles.iconSize}px` }} />
                </a>
            ) : null,
            fieldOrder.includes('github') && formData.github ? (
                <a key="github" href={formData.github} style={{ textDecoration: 'none', display: 'inline-block' }}>
                    <img src="https://img.icons8.com/ios-filled/50/000000/github.png" alt="GitHub" width={styles.iconSize} height={styles.iconSize} style={{ display: 'block', width: `${styles.iconSize}px`, height: `${styles.iconSize}px` }} />
                </a>
            ) : null,
            fieldOrder.includes('whatsapp') && formData.phone ? (
                <a key="whatsapp" href={`https://wa.me/${formData.phone}`} style={{ textDecoration: 'none', display: 'inline-block' }}>
                    <img src="https://img.icons8.com/ios-filled/50/25D366/whatsapp.png" alt="WhatsApp" width={styles.iconSize} height={styles.iconSize} style={{ display: 'block', width: `${styles.iconSize}px`, height: `${styles.iconSize}px` }} />
                </a>
            ) : null,
        ].filter(Boolean);

        return (
          <table key="social-icons" cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse', marginTop: '5px' }}>
            <tbody>
              <tr>
                {socialIcons.map((icon, index) => (
                    <td key={index} style={{ paddingRight: index === socialIcons.length - 1 ? '0' : `${styles.socialIconSpacing}px` }}>
                        {icon}
                    </td>
                ))}
              </tr>
            </tbody>
          </table>
        );
      }

      const contactIconSize = 14;

      switch (fieldName) {
        case 'name':
          return <p key={fieldName} style={{
            margin: 0,
            fontSize: '16px',
            color: styles.primaryColor, ...getTextStyle('name')
          }}>{formData.name}</p>;
        case 'role':
          return <p key={fieldName} style={{margin: '2px 0', ...getTextStyle('role')}}>{formData.role} | <span
            style={getTextStyle('company')}>{formData.company}</span></p>;
        case 'company':
          return null;
        case 'countryName':
          return (
            <p key={fieldName} style={{margin: '2px 0', display: 'flex', alignItems: 'center', gap: '5px', ...getTextStyle('countryName')}}>
              <img
                src={getIconUrl('marker', styles.primaryColor)}
                alt="Location"
                width={contactIconSize}
                height={contactIconSize}
                style={{display: 'inline-block', verticalAlign: 'middle'}}
              />
              <span>{formData.countryName}</span>
            </p>
          );
        case 'phone':
          return (
            <p key={fieldName} style={{margin: '2px 0', display: 'flex', alignItems: 'center', gap: '5px'}}>
              <img
                src={getIconUrl('phone', styles.primaryColor)}
                alt="Phone"
                width={contactIconSize}
                height={contactIconSize}
                style={{display: 'inline-block', verticalAlign: 'middle'}}
              />
              <span style={getTextStyle('phone')}>{fullPhoneNumber}</span>
            </p>
          );
        case 'email':
          return (
            <p key={fieldName} style={{margin: '2px 0', display: 'flex', alignItems: 'center', gap: '5px'}}>
              <img
                src={getIconUrl('mail', styles.primaryColor)}
                alt="Email"
                width={contactIconSize}
                height={contactIconSize}
                style={{display: 'inline-block', verticalAlign: 'middle'}}
              />
              <span style={getTextStyle('email')}>
                <a href={`mailto:${formData.email}`} style={{color: styles.primaryColor, textDecoration: 'none'}}>{formData.email}</a>
              </span>
            </p>
          );
        case 'website':
          const displayWebsite = formData.website.length > 30
            ? formData.website.substring(0, 30) + '...'
            : formData.website;

          // Ensure the URL has a protocol for the href
          const websiteUrl = formData.website.startsWith('http')
            ? formData.website
            : `http://${formData.website}`;

          return (
            <p key={fieldName} style={{margin: '2px 0', display: 'flex', alignItems: 'center', gap: '5px', ...getTextStyle('website')}}>
              <img
                src={getIconUrl('globe', styles.primaryColor)}
                alt="Website"
                width={contactIconSize}
                height={contactIconSize}
                style={{display: 'inline-block', verticalAlign: 'middle'}}
              />
              <a href={websiteUrl} style={{color: styles.primaryColor, textDecoration: 'none'}}>{displayWebsite}</a>
            </p>
          );
        default:
          return null;
      }
    });
    return fields;
  };

  const templates = {
    classic: (
      <table cellPadding="0" cellSpacing="0" style={{
        borderCollapse: 'collapse',
        fontSize: `${styles.fontSize}px`,
        color: styles.textColor,
        fontFamily: 'Arial, sans-serif'
      }}>
        <tbody>
        <tr>
          <td style={{paddingRight: '10px'}}>
            <img src={formData.image} alt="Profile" width="80" style={{borderRadius: `${styles.imageRadius}%`}}/>
          </td>
          <td style={{borderLeft: `1px solid ${styles.primaryColor}`, paddingLeft: '10px'}}>
            {renderOrderedFields()}
          </td>
        </tr>
        </tbody>
      </table>
    ),
    modern: (
      <table cellPadding="0" cellSpacing="0" style={{
        borderCollapse: 'collapse',
        fontSize: `${styles.fontSize}px`,
        color: styles.textColor,
        fontFamily: 'Arial, sans-serif'
      }}>
        <tbody>
        <tr>
          <td style={{paddingRight: '15px', verticalAlign: 'top'}}>
            <img src={formData.image} alt="Profile" width="90"
                 style={{borderRadius: `${styles.imageRadius}%`, border: `2px solid ${styles.primaryColor}`}}/>
          </td>
          <td style={{verticalAlign: 'top'}}>
            {renderOrderedFields()}
            <hr style={{border: 'none', borderTop: `1px solid ${styles.primaryColor}`, margin: '8px 0'}}/>
          </td>
        </tr>
        </tbody>
      </table>
    ),
    compact: (
      <table cellPadding="0" cellSpacing="0" style={{
        borderCollapse: 'collapse',
        fontSize: `${styles.fontSize}px`,
        color: styles.textColor, ...getTextStyle('name'),
        fontFamily: 'Arial, sans-serif'
      }}>
        <tbody>
        <tr>
          <td style={{verticalAlign: 'middle'}}>
            {renderOrderedFields()}
          </td>
        </tr>
        </tbody>
      </table>
    )
  };

  const getInputIcon = (name: string, Icon: React.ElementType) => (
    <Icon
      className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${
        activeInput === name ? "text-black" : "text-muted-foreground"
      }`}
    />
  );

  const renderFieldControl = (fieldName: FieldName, index: number) => {
    const fieldConfig: { [key in FieldName]?: { icon: React.ElementType, type: string } } = {
      name: {icon: User, type: 'text'},
      role: {icon: Briefcase, type: 'text'},
      company: {icon: Building, type: 'text'},
      phone: {icon: Phone, type: 'phone'},
      email: {icon: Mail, type: 'email'},
      website: {icon: Globe, type: 'text'},
      linkedin: {icon: Linkedin, type: 'text'},
      github: {icon: Github, type: 'text'},
      image: {icon: ImageIcon, type: 'image'},
    };

    const config = fieldConfig[fieldName];
    if (!config || fieldName === 'countryName') return null;

    let inputComponent;

    if (fieldName === 'phone') {
      inputComponent = (
        <div className="flex items-center w-full">
          <Select value={formData.countryName}
                  onValueChange={(value) => setFormData(prev => ({...prev, countryName: value}))}>
            <SelectTrigger className="w-32 rounded-r-none"><SelectValue placeholder="Code"/></SelectTrigger>
            <SelectContent>{countries.map(country => (<SelectItem key={country.name}
                                                                  value={country.name}>{country.flag} +{country.code}</SelectItem>))}</SelectContent>
          </Select>
          <div className="relative flex-grow">
            <Phone
              className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${activeInput === 'phone' ? 'text-black' : 'text-muted-foreground'}`}/>
            <Input name="phone" value={formData.phone} onChange={handleInputChange}
                   onFocus={() => setActiveInput("phone")} onBlur={() => setActiveInput("")}
                   placeholder={t("tools.signature-generator.form.phone.placeholder")}
                   className="rounded-l-none pl-10"/>
          </div>
        </div>
      );
    } else if (fieldName === 'image') {
      inputComponent = (
        <div className="relative w-full">
          {getInputIcon(fieldName, config.icon)}
          <Input name="image" value={formData.image} onChange={handleInputChange}
                 onFocus={() => setActiveInput("image")} onBlur={() => setActiveInput("")}
                 placeholder={t("tools.signature-generator.form.image.placeholder")} className="pl-10 pr-24"/>
          <Button variant="outline" size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black hover:bg-black hover:text-white"
                  onClick={() => fileInputRef.current?.click()}>Upload</Button>
          <Input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*"/>
        </div>
      );
    } else {
      inputComponent = (
        <div className="relative w-full">
          {getInputIcon(fieldName, config.icon)}
          <Input name={fieldName} type={config.type} value={formData[fieldName as keyof typeof formData]}
                 onChange={handleInputChange} onFocus={() => setActiveInput(fieldName)}
                 onBlur={() => setActiveInput("")}
                 placeholder={t(`tools.signature-generator.form.${fieldName}.placeholder`)} className="pl-10 pr-10"/>
          {activeInput === fieldName && formData[fieldName as keyof typeof formData] && (
            <Button variant="ghost" size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full hover:bg-muted"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      clearInput(fieldName);
                    }}>
              <X className="h-4 w-4"/>
            </Button>
          )}
        </div>
      );
    }

    return (
      <div key={fieldName} className="flex items-center gap-2">
        {inputComponent}
        <div className="flex flex-col">
          <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-black hover:text-white"
                  onClick={() => moveField(index, 'up')} disabled={index === 0}><ArrowUp className="h-4 w-4"/></Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-black hover:text-white"
                  onClick={() => moveField(index, 'down')} disabled={index === fieldOrder.length - 1}><ArrowDown
            className="h-4 w-4"/></Button>
        </div>
      </div>
    );
  };

  const handleTextStyleChange = (style: 'isBold' | 'isItalic' | 'isUnderline') => {
    if (activeInput && styles.textStyles[activeInput as keyof typeof styles.textStyles]) {
      setStyles(prev => ({
        ...prev,
        textStyles: {
          ...prev.textStyles,
          [activeInput]: {
            ...prev.textStyles[activeInput as keyof typeof styles.textStyles],
            [style]: !prev.textStyles[activeInput as keyof typeof styles.textStyles][style]
          }
        }
      }));
    }
  };

  const isTextStyleToolbarVisible = activeTab === 'data' && activeInput && styles.textStyles.hasOwnProperty(activeInput);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader><CardTitle>{t("tools.signature-generator.title")}</CardTitle></CardHeader>
        <CardContent>
          {isTextStyleToolbarVisible && (
            <div className="p-2 rounded-md border bg-muted/50 mb-4" onMouseDown={(e) => e.preventDefault()}>
              <ToggleGroup type="multiple" variant="outline" className="gap-0.5">
                <ToggleGroupItem value="bold" aria-label="Toggle bold" onClick={() => handleTextStyleChange('isBold')}
                                 data-state={styles.textStyles[activeInput as keyof typeof styles.textStyles]?.isBold ? 'on' : 'off'}
                                 className="data-[state=on]:bg-black data-[state=on]:text-white bg-white text-black hover:bg-black hover:text-white"><Bold
                  className="h-4 w-4"/></ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic"
                                 onClick={() => handleTextStyleChange('isItalic')}
                                 data-state={styles.textStyles[activeInput as keyof typeof styles.textStyles]?.isItalic ? 'on' : 'off'}
                                 className="data-[state=on]:bg-black data-[state=on]:text-white bg-white text-black hover:bg-black hover:text-white"><Italic
                  className="h-4 w-4"/></ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Toggle underline"
                                 onClick={() => handleTextStyleChange('isUnderline')}
                                 data-state={styles.textStyles[activeInput as keyof typeof styles.textStyles]?.isUnderline ? 'on' : 'off'}
                                 className="data-[state=on]:bg-black data-[state=on]:text-white bg-white text-black hover:bg-black hover:text-white"><Underline
                  className="h-4 w-4"/></ToggleGroupItem>
              </ToggleGroup>
            </div>
          )}
          <Tabs defaultValue="data" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="data"
                           className="data-[state=active]:bg-black data-[state=active]:text-white hover:bg-muted hover:text-foreground"><FileText
                className="w-4 h-4 mr-2"/>{t("tools.signature-generator.tabs.data")}</TabsTrigger>
              <TabsTrigger value="style"
                           className="data-[state=active]:bg-black data-[state=active]:text-white hover:bg-muted hover:text-foreground"><Palette
                className="w-4 h-4 mr-2"/>{t("tools.signature-generator.tabs.style")}</TabsTrigger>
              <TabsTrigger value="templates"
                           className="data-[state=active]:bg-black data-[state=active]:text-white hover:bg-muted hover:text-foreground"><Brush
                className="w-4 h-4 mr-2"/>{t("tools.signature-generator.tabs.templates")}</TabsTrigger>
            </TabsList>
            <TabsContent value="data" className="mt-4">
              <div
                className="space-y-4">{fieldOrder.map((fieldName, index) => renderFieldControl(fieldName, index))}</div>
            </TabsContent>
            <TabsContent value="style" className="mt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <ColorPicker label={t("tools.signature-generator.style.primary-color")} value={styles.primaryColor}
                               onChange={(value) => setStyles(prev => ({...prev, primaryColor: value}))}/>
                  <ColorPicker label={t("tools.signature-generator.style.text-color")} value={styles.textColor}
                               onChange={(value) => setStyles(prev => ({...prev, textColor: value}))}/>
                </div>
                <div className="space-y-2">
                  <Label>{t("tools.signature-generator.style.font-size")} ({styles.fontSize}px)</Label><Slider
                  defaultValue={[styles.fontSize]} max={24} step={1}
                  onValueChange={(value) => setStyles(prev => ({...prev, fontSize: value[0]}))}/></div>
                <div className="space-y-2">
                  <Label>{t("tools.signature-generator.style.image-radius")} ({styles.imageRadius}%)</Label><Slider
                  defaultValue={[styles.imageRadius]} max={50} step={1}
                  onValueChange={(value) => setStyles(prev => ({...prev, imageRadius: value[0]}))}/></div>
                <div className="space-y-2">
                  <Label>{t("tools.signature-generator.style.icon-size")} ({styles.iconSize}px)</Label><Slider
                  defaultValue={[styles.iconSize]} max={48} step={1}
                  onValueChange={(value) => setStyles(prev => ({...prev, iconSize: value[0]}))}/></div>
                <div className="space-y-2">
                  <Label>Social Icon Spacing ({styles.socialIconSpacing}px)</Label><Slider
                  defaultValue={[styles.socialIconSpacing]} max={50} step={1}
                  onValueChange={(value) => setStyles(prev => ({...prev, socialIconSpacing: value[0]}))}/></div>
              </div>
            </TabsContent>
            <TabsContent value="templates" className="mt-4">
              <RadioGroup defaultValue={template} onValueChange={(value) => setTemplate(value)}
                          className="grid grid-cols-3 gap-4">
                <Label htmlFor="classic"
                       className={cn("border-2 rounded-lg p-4 cursor-pointer", template === 'classic' && "border-black")}><RadioGroupItem
                  value="classic" id="classic" className="sr-only"/><p
                  className="text-center font-semibold mb-2">{t("tools.signature-generator.templates.classic")}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex-shrink-0"></div>
                    <div className="space-y-2 w-full">
                      <div className="h-2 w-3/4 bg-muted rounded"></div>
                      <div className="h-2 w-full bg-muted rounded"></div>
                      <div className="h-2 w-1/2 bg-muted rounded"></div>
                    </div>
                  </div>
                </Label>
                <Label htmlFor="modern"
                       className={cn("border-2 rounded-lg p-4 cursor-pointer", template === 'modern' && "border-black")}><RadioGroupItem
                  value="modern" id="modern" className="sr-only"/><p
                  className="text-center font-semibold mb-2">{t("tools.signature-generator.templates.modern")}</p>
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-muted"></div>
                    <div className="h-2 w-3/4 bg-muted rounded"></div>
                    <div className="h-2 w-full bg-muted rounded"></div>
                    <div className="h-2 w-1/2 bg-muted rounded"></div>
                  </div>
                </Label>
                <Label htmlFor="compact"
                       className={cn("border-2 rounded-lg p-4 cursor-pointer", template === 'compact' && "border-black")}><RadioGroupItem
                  value="compact" id="compact" className="sr-only"/><p
                  className="text-center font-semibold mb-2">{t("tools.signature-generator.templates.compact")}</p>
                  <div className="space-y-2">
                    <div className="h-2 w-3/4 bg-muted rounded"></div>
                    <div className="h-2 w-full bg-muted rounded"></div>
                  </div>
                </Label>
              </RadioGroup>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <div className="light p-4 rounded-lg">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between"><CardTitle
            className="text-black">{t("tools.signature-generator.preview")}</CardTitle>
            <div className="flex gap-2">
              <Button size="sm"
                      className="bg-black text-white hover:bg-black hover:opacity-90"
                      onClick={copySignatureToClipboard}><Copy
              className="w-4 h-4 mr-2"/>{t("tools.signature-generator.copy.signature")}</Button></div>
          </CardHeader>
          <CardContent>
            <BrowserMockup>
              <div ref={signatureRef} style={{fontSize: `${styles.fontSize}px`, color: styles.textColor}}>
                {templates[template as keyof typeof templates]}
              </div>
            </BrowserMockup>
          </CardContent>
        </Card>
        <div className="space-y-2 mt-4">
          <div className="flex items-center gap-3 border p-3 rounded-lg "><Mail color="#D93025"
                                                                                className="w-5 h-5 flex-shrink-0"/>
            <div><h3 className="font-semibold text-sm text-black">Gmail</h3><p
              className="text-xs text-muted-foreground">{t("tools.signature-generator.guide.gmail")}</p></div>
          </div>
          <div className="flex items-center gap-3 border p-3 rounded-lg "><Mail color="#0078D4"
                                                                                className="w-5 h-5 flex-shrink-0"/>
            <div><h3 className="font-semibold text-sm text-black">Outlook</h3><p
              className="text-xs text-muted-foreground">{t("tools.signature-generator.guide.outlook")}</p></div>
          </div>
          <div className="flex items-center gap-3 border p-3 rounded-lg "><Mail color="#38A1F3"
                                                                                className="w-5 h-5 flex-shrink-0"/>
            <div><h3 className="font-semibold text-sm text-black">Apple Mail</h3><p
              className="text-xs text-muted-foreground">{t("tools.signature-generator.guide.apple-mail")}</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureGenerator;
