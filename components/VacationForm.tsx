'use client';

import { useRef } from 'react';
import { useForm, Controller, Control } from 'react-hook-form';
import { Plane, Building2, Waves, Mountain, Compass, Landmark, Binoculars, X, LucideIcon } from 'lucide-react';

import clsx from 'clsx';

type FormValues = {
  month: string[];
  temperature: string[];
  vacationType: string[];
  continent: string[];
  flightDuration: string[];
};

interface VacationFormProps {
  onSubmit: (preferences: FormValues) => void;
  isLoading: boolean;
}
 
type Continent = 'europe' | 'asia' | 'north america' | 'south america' | 'africa' | 'oceania'
type VacationType = 'city break' | 'sea' | 'mountains' | 'adventure' | 'culture' | 'safari';
type Temperature = 'cold' | 'cool' | 'warm' | 'hot';
type Month =  'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';
type FlightDuration = '0-4' | '4-10' | '10+';

type BaseOption<T extends string> = {
  value: T;
  label: string;
  description?: string;
};

type EmojiOption<T extends string> = BaseOption<T> & {
  emoji: string;
};

type IconOption<T extends string> = BaseOption<T> & {
  icon: LucideIcon;
  color: string;
};

const vacationTypes: IconOption<VacationType>[] = [
  { value: 'city break', label: 'City Break', icon: Building2, color: 'orange' },
  { value: 'sea', label: 'Beach', icon: Waves, color: 'cyan' },
  { value: 'mountains', label: 'Mountains', icon: Mountain, color: 'green' },
  { value: 'adventure', label: 'Adventure', icon: Compass, color: 'indigo' },
  { value: 'culture', label: 'Culture', icon: Landmark, color: 'blue' },
  { value: 'safari', label: 'Safari & Wildlife', icon: Binoculars, color: 'yellow' }
];

const continents: EmojiOption<Continent>[] = [
  { value: 'europe', label: 'Europe', emoji: '🏰' },
  { value: 'asia', label: 'Asia', emoji: '🏯' },
  { value: 'north america', label: 'North America', emoji: '🗽' },
  { value: 'south america', label: 'South America', emoji: '🦜' },
  { value: 'africa', label: 'Africa', emoji: '🦁' },
  { value: 'oceania', label: 'Oceania', emoji: '🦘' }
];

const temperatures: EmojiOption<Temperature>[] = [
  { value: 'cold', label: 'Cold', emoji: '❄️', description: '<10°C' },
  { value: 'cool', label: 'Cool', emoji: '🌤️', description: '10-20°C' },
  { value: 'warm', label: 'Warm', emoji: '☀️', description: '20-30°C' },
  { value: 'hot', label: 'Hot', emoji: '🔥', description: '>30°C' }
];

const months: BaseOption<Month>[] = [
  { value: 'January', label: 'January' },
  { value: 'February', label: 'February' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'August', label: 'August' },
  { value: 'September', label: 'September' },
  { value: 'October', label: 'October' },
  { value: 'November', label: 'November' },
  { value: 'December', label: 'December' }
];

const flightDurations: EmojiOption<FlightDuration>[] = [
  { value: '0-4', label: 'Short flight', emoji: '✈️', description: 'Up to 4h' },
  { value: '4-10', label: 'Medium flight', emoji: '🌍', description: '4-10h' },
  { value: '10+', label: 'Long flight', emoji: '🛫', description: '10h+' }
];


 interface ToggleGroupProps<OptionType> {
    name: keyof FormValues;
    options: OptionType[];
    getValue: (option: OptionType) => string;
    renderContent: (option: OptionType) => React.ReactNode;
    getButtonClass: (option: OptionType, isSelected: boolean) => string;
    colsClass: string;
    control:  Control<FormValues>;
  }

export function VacationForm({ onSubmit, isLoading }: VacationFormProps) {


  const lastSubmittedRef = useRef<FormValues | null>(null);

  const { handleSubmit: rhfHandleSubmit, watch, reset, control } = useForm<FormValues>({
    defaultValues: { month: [], temperature: [], vacationType: [], continent: [], flightDuration: [] }
  });

  const watched = watch();
  const month = watched.month || [];
  const temperature = watched.temperature || [];
  const vacationType = watched.vacationType || [];
  const continent = watched.continent || [];
  const flightDuration = watched.flightDuration || [];

  const isEmpty = month.length === 0 && temperature.length === 0 && vacationType.length === 0 && continent.length === 0 && flightDuration.length === 0;

  const currentValues = { month, temperature, vacationType, continent, flightDuration };
  const lastSubmitted = lastSubmittedRef.current ?? { month: [], temperature: [], vacationType: [], continent: [], flightDuration: [] };
  const hasChanged = !isEmpty && JSON.stringify(currentValues) !== JSON.stringify(lastSubmitted);

  const handleSubmit = (data: FormValues) => {
    lastSubmittedRef.current = data;
    reset(data, { keepValues: true });
    onSubmit(data);
  };

 

  function ToggleGroup<OptionType>({
    name,
    options,
    getValue,
    renderContent,
    getButtonClass,
    colsClass,
    control
  }: ToggleGroupProps<OptionType>) {
    return (
      <div className={colsClass}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              {options.map((opt) => {
                const val = getValue(opt);
                const cur = field.value || [];
                const isSelected = cur.includes(val);
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => {
                      const next = cur.includes(val) ? cur.filter((v: string) => v !== val) : [...cur, val];
                      field.onChange(next);
                    }}
                    className={getButtonClass(opt, isSelected)}
                  >
                    {renderContent(opt)}
                  </button>
                );
              })}
            </>
          )}
        />
      </div>
    );
  }

  const getVacationTypeStyles = (type: typeof vacationTypes[0], isSelected: boolean) => {
    if (!isSelected) {
      return 'bg-white/80 text-gray-600 hover:bg-white/90 hover:shadow-sm border-2 border-gray-200 cursor-pointer';
    }
    
    const colorMap = {
      gray: 'bg-gray-50 text-gray-700 border-2 border-gray-400 cursor-pointer',
      orange: 'bg-orange-50 text-orange-700 border-2 border-orange-400 cursor-pointer',
      cyan: 'bg-cyan-50 text-cyan-700 border-2 border-cyan-400 cursor-pointer',
      green: 'bg-green-50 text-green-700 border-2 border-green-400 cursor-pointer',
      indigo: 'bg-indigo-50 text-indigo-700 border-2 border-indigo-400 cursor-pointer',
      blue: 'bg-blue-50 text-blue-700 border-2 border-blue-400 cursor-pointer',
      yellow: 'bg-yellow-50 text-yellow-700 border-2 border-yellow-400 cursor-pointer'
    };
    
    return colorMap[type.color as keyof typeof colorMap];
  };

  return (
    <form onSubmit={rhfHandleSubmit(handleSubmit)} className="bg-white rounded-3xl shadow-2xl p-12 border border-blue-200/50">
      <div className="space-y-10">
        <div>
          <label className="block mb-5 text-gray-800 text-xl">
            What type of vacation are you looking for?
            <span className="block text-sm text-gray-600 mt-2">Select your ideal travel style</span>
          </label>
          <ToggleGroup
            name="vacationType"
            control={control}
            options={vacationTypes}
            getValue={(o) => o.value}
            colsClass="grid grid-cols-3 gap-3"
            getButtonClass={(opt, isSelected: boolean) => `rounded-xl p-3 transition-all flex flex-col items-center gap-2 ${getVacationTypeStyles(opt, isSelected)}`}
            renderContent={(opt) => (
              <>
                {opt.icon && <opt.icon className="w-6 h-6" />}
                <span className="text-sm">{opt.label}</span>
              </>
            )}
          />
        </div>

        <div>
          <label className="block mb-5 text-gray-800 text-xl">
            Which continent interests you?
            <span className="block text-sm text-gray-600 mt-2">Pick your dream region</span>
          </label>
          <ToggleGroup
            name="continent"
            control={control}
            options={continents}
            getValue={(o) => o.value}
            colsClass="grid grid-cols-3 gap-3"
            getButtonClass={(_, isSelected: boolean) => `rounded-xl p-3 transition-all flex items-center gap-2 cursor-pointer ${isSelected ? 'bg-blue-50 text-blue-700 border-2 border-blue-400' : 'bg-white/80 text-gray-600 hover:bg-white/90 hover:shadow-sm border-2 border-gray-200'}`}
            renderContent={(opt) => (
              <>
                <span className="text-xl">{opt.emoji}</span>
                <span className="text-sm">{opt.label}</span>
              </>
            )}
          />
        </div>

        <div>
          <label className="block mb-5 text-gray-800 text-xl">
            When are you planning to travel?
            <span className="block text-sm text-gray-600 mt-2">Choose your travel month</span>
          </label>
          <ToggleGroup
            name="month"
            control={control}
            options={months}
            getValue={(o) => o.value}
            colsClass="grid grid-cols-6 gap-2"
            getButtonClass={(_, isSelected: boolean) => `rounded-lg px-2 py-1.5 transition-all text-center cursor-pointer ${isSelected ? 'bg-cyan-50 text-cyan-700 border-2 border-cyan-400' : 'bg-white/80 text-gray-600 hover:bg-white/90 hover:shadow-sm border-2 border-gray-200'}`}
            renderContent={(opt) => <span className="text-sm">{opt.label}</span>}
          />
        </div>

        <div>
          <label className="block mb-5 text-gray-800 text-xl">
            What&rsquo;s your ideal temperature?
            <span className="block text-sm text-gray-600 mt-2">Select weather preference</span>
          </label>
          <ToggleGroup
            name="temperature"
            control={control}
            options={temperatures}
            getValue={(o) => o.value}
            colsClass="grid grid-cols-4 gap-3"
            getButtonClass={(_, isSelected: boolean) => `rounded-xl p-3 transition-all flex items-center gap-3 cursor-pointer ${isSelected ? 'bg-orange-50 text-orange-700 border-2 border-orange-400' : 'bg-white/80 text-gray-600 hover:bg-white/90 hover:shadow-sm border-2 border-gray-200'}`}
            renderContent={(opt) => (
              <>
                <div className="text-2xl">{opt.emoji}</div>
                <div className="text-left">
                  <div className="text-sm">{opt.label}</div>
                  <div className="text-xs opacity-70">{opt.description}</div>
                </div>
              </>
            )}
          />
        </div>

        <div>
          <label className="block mb-5 text-gray-800 text-xl">
            How long is your flight?
            <span className="block text-sm text-gray-600 mt-2">Select your preferred travel time</span>
          </label>
          <ToggleGroup
            name="flightDuration"
            control={control}
            options={flightDurations}
            getValue={(o) => o.value}
            colsClass="grid grid-cols-3 gap-3"
            getButtonClass={(_, isSelected: boolean) => `rounded-xl p-3 transition-all flex items-center gap-2 cursor-pointer ${isSelected ? 'bg-purple-50 text-purple-700 border-2 border-purple-400' : 'bg-white/80 text-gray-600 hover:bg-white/90 hover:shadow-sm border-2 border-gray-200'}`}
            renderContent={(opt) => (
              <>
                <span className="text-2xl">{opt.emoji}</span>
                <div className="text-left">
                  <div className="text-sm">{opt.label}</div>
                  <div className="text-xs opacity-70">{opt.description}</div>
                </div>
              </>
            )}
          />
        </div>

        <div className="pt-4 space-y-3">
            <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading || !hasChanged}
              title={isLoading ? 'Searching...' : (!hasChanged ? 'Select or change preferences to enable search' : 'Find My Perfect Destination')}
              aria-disabled={isLoading || !hasChanged}
              className={clsx({"cursor-pointer": !isLoading && hasChanged } ,"bg-linear-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-700 hover:via-blue-700 hover:to-indigo-700 text-white py-4 px-12 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:hover:scale-100 w-100 whitespace-nowrap")}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-3 border-white border-t-transparent"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <Plane className="w-5 h-5" />
                  <span>Find My Perfect Destination</span>
                </div>
              )}
            </button>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => reset()}
              disabled={isEmpty}
              title={isEmpty ? 'Nothing to clear' : 'Clear all selections'}
              aria-disabled={isEmpty}
              className={clsx(
                "py-2 px-6 rounded-lg transition-all cursor-pointer flex items-center gap-2 border",
                isEmpty
                  ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed opacity-50"
                  : "bg-white/80 hover:bg-white/90 text-red-600 hover:text-red-700 border-red-400 hover:shadow-sm transform hover:scale-105"
              )}
            >
              <X className="w-5 h-5" />
              Clear All
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}