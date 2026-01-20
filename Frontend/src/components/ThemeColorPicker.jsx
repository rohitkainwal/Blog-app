const colors = [
  { name: "Blue", value: "59 130 246" },
  { name: "Indigo", value: "99 102 241" },
  { name: "Purple", value: "168 85 247" },
  { name: "Pink", value: "236 72 153" },
  { name: "Rose", value: "244 63 94" },
  { name: "Green", value: "34 197 94" },
  { name: "Emerald", value: "16 185 129" },
  { name: "Teal", value: "20 184 166" },
  { name: "Cyan", value: "6 182 212" },
  { name: "Sky", value: "14 165 233" },
  { name: "Orange", value: "249 115 22" },
  { name: "Amber", value: "245 158 11" },
  { name: "Yellow", value: "234 179 8" },
  { name: "Lime", value: "132 204 22" },
  { name: "Red", value: "239 68 68" },
  { name: "Slate", value: "71 85 105" },
];

const ThemeColorPicker = ({ close }) => {
  const setColor = (rgb) => {
    document.documentElement.style.setProperty(
      "--color-primary",
      rgb
    );
  };

  return (
    <div className="absolute z-10 right-6 top-16 bg-white dark:bg-zinc-900 shadow-lg rounded-xl p-4 w-40">
      <div className="grid grid-cols-2 gap-3">
        {colors.map((c) => (
          <button
            key={c.name}
            onClick={() => setColor(c.value)}
            className="w-10 h-10 rounded-full"
            style={{ backgroundColor: `rgb(${c.value})` }}
          />
        ))}
      </div>

      <button
        onClick={close}
        className="mt-4 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
      >
        close
      </button>
    </div>
  );
};

export default ThemeColorPicker;
