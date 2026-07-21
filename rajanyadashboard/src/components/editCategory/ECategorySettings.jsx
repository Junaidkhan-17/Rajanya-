import { CheckCircle2 } from "lucide-react";

const ECategorySettings = ({ category, setCategory }) => {
  const handleChange = (field, value) => {
    setCategory((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const RadioGroup = ({ title, field }) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-4">
        {title}
      </label>

      <div className="flex items-center gap-8">
        {/* Yes */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            className="hidden"
            checked={category?.[field] === true}
            onChange={() => handleChange(field, true)}
          />

          {category?.[field] ? (
            <CheckCircle2
              size={20}
              className="text-green-500 fill-green-100"
            />
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
          )}

          <span className="text-sm text-slate-700">Yes</span>
        </label>

        {/* No */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            className="hidden"
            checked={category?.[field] === false}
            onChange={() => handleChange(field, false)}
          />

          {!category?.[field] ? (
            <CheckCircle2
              size={20}
              className="text-green-500 fill-green-100"
            />
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
          )}

          <span className="text-sm text-slate-700">No</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 bg-black rounded text-white flex items-center justify-center text-xs font-bold">
          5
        </div>

        <h2 className="text-lg font-semibold text-slate-800">
          Display Settings
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <RadioGroup
          title="Featured Category"
          field="featured"
        />

        <RadioGroup
          title="Show on Homepage"
          field="showOnHomepage"
        />

        <RadioGroup
          title="Show in Navigation Menu"
          field="showInNavigation"
        />
      </div>
    </div>
  );
};

export default ECategorySettings;