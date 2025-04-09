import { useState } from "react";
import Logo from "./Logo";
import LogoMinimal from "./LogoMinimal";
import LogoSleek from "./LogoSleek";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function LogoShowcase() {
  const [selectedLogo, setSelectedLogo] = useState<"standard" | "minimal" | "sleek">("sleek");
  const [size, setSize] = useState<"small" | "medium" | "large">("medium");
  const [variant, setVariant] = useState<"full" | "icon">("full");
  const [animated, setAnimated] = useState(true);
  const [colorScheme, setColorScheme] = useState<"gold" | "black" | "white">("gold");
  const [darkBackground, setDarkBackground] = useState(false);

  // Function to render the selected logo with current props
  const renderSelectedLogo = () => {
    const props = {
      size,
      variant,
      animated,
      className: ""
    };

    switch (selectedLogo) {
      case "standard":
        return <Logo {...props} />;
      case "minimal":
        return <LogoMinimal {...props} />;
      case "sleek":
        return <LogoSleek {...props} colorScheme={colorScheme} />;
      default:
        return <LogoSleek {...props} colorScheme={colorScheme} />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Logo Design Options</h2>
      
      <div className={`flex flex-col lg:flex-row gap-6 ${darkBackground && "bg-black text-white p-6 rounded-xl"}`}>
        {/* Logo display area */}
        <div className="flex-1 flex items-center justify-center border rounded-xl p-10" style={{ 
          backgroundColor: darkBackground ? "#111" : "#fff",
          minHeight: "300px"
        }}>
          {renderSelectedLogo()}
        </div>
        
        {/* Controls */}
        <div className="w-full lg:w-64 space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Logo Style</h3>
            <Tabs value={selectedLogo} onValueChange={(value) => setSelectedLogo(value as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="standard">Standard</TabsTrigger>
                <TabsTrigger value="minimal">Minimal</TabsTrigger>
                <TabsTrigger value="sleek">Sleek</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Size</h3>
            <RadioGroup 
              value={size} 
              onValueChange={(value) => setSize(value as any)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="small" />
                <Label htmlFor="small">Small</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="large" />
                <Label htmlFor="large">Large</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Variant</h3>
            <RadioGroup 
              value={variant} 
              onValueChange={(value) => setVariant(value as any)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full" id="full" />
                <Label htmlFor="full">Full Logo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="icon" id="icon" />
                <Label htmlFor="icon">Icon Only</Label>
              </div>
            </RadioGroup>
          </div>
          
          {selectedLogo === "sleek" && (
            <div>
              <h3 className="text-sm font-medium mb-2">Color Scheme</h3>
              <RadioGroup 
                value={colorScheme} 
                onValueChange={(value) => setColorScheme(value as any)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gold" id="gold" />
                  <Label htmlFor="gold">Gold</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="black" id="black" />
                  <Label htmlFor="black">Black</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="white" id="white" />
                  <Label htmlFor="white">White</Label>
                </div>
              </RadioGroup>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="animated" 
              checked={animated}
              onCheckedChange={setAnimated}
            />
            <Label htmlFor="animated">Animated</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="darkBackground" 
              checked={darkBackground}
              onCheckedChange={setDarkBackground}
            />
            <Label htmlFor="darkBackground">Dark Background</Label>
          </div>
          
          <Button 
            className="w-full mt-4" 
            onClick={() => {
              setAnimated(false);
              setTimeout(() => setAnimated(true), 10);
            }}
          >
            Replay Animation
          </Button>
        </div>
      </div>
    </div>
  );
}