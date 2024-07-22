import { useState } from "react";

interface ColorInputProps {
  onClassNameChange: (className: string) => void;
}
const ColorInput: React.FC<ColorInputProps> = ({ onClassNameChange }) => {
  const [colorName, setColorName] = useState<string>("");
  const [intensity, setIntensity] = useState<number>(900);
  const [isBgColor, setIsBgColor] = useState<boolean>(true);

  const handleColorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorName(e.target.value);
  };

  const handleIntensityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIntensity(parseInt(e.target.value));
  };

  const handleColorTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsBgColor(e.target.checked);
  };

  const generateClassName = () => {
    const colorClass = `${isBgColor ? "bg-" : "red-"}${colorName}-${intensity}`;
    onClassNameChange(colorClass);
    console.log(colorClass);
  };
  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        value={colorName}
        onChange={handleColorNameChange}
        placeholder="Enter color name (e.g., red)"
        className="border rounded px-2 py-1"
      />
      <select
        value={intensity}
        onChange={handleIntensityChange}
        className="border rounded px-2 py-1"
      >
        {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <div className="flex items-center space-x-2">
        <label>
          <input
            type="radio"
            checked={isBgColor}
            onChange={handleColorTypeChange}
            className="mr-1"
          />
          Background
        </label>
        <label>
          <input
            type="radio"
            checked={!isBgColor}
            onChange={handleColorTypeChange}
            className="mr-1"
          />
          Text
        </label>
      </div>
      <button
        onClick={generateClassName}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Apply
      </button>
    </div>
  );
};

export default ColorInput;
