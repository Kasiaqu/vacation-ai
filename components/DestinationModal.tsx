'use client';

import { Destination } from "../types";
import {
  MapPin,
  ThermometerSun,
  Calendar,
  DollarSign,
  Plane,
  Lightbulb,
  Star,
  TrendingUp,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface DestinationModalProps {
  destination: Destination;
  isOpen: boolean;
  onClose: () => void;
}

export function DestinationModal({
  destination,
  isOpen,
  onClose,
}: DestinationModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images =
    destination.imageUrls && destination.imageUrls.length > 0
      ? destination.imageUrls
      : destination.imageUrl
        ? [destination.imageUrl]
        : [];

  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  const isFirstImage = currentImageIndex === 0;
  const isLastImage = currentImageIndex === images.length - 1;

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      const background =
        document.getElementById("app-background");
      const content = document.getElementById("app-content");
      const navigation =
        document.getElementById("app-navigation");
      if (background) background.style.filter = "blur(8px)";
      if (content) content.style.filter = "blur(8px)";
      if (navigation) navigation.style.filter = "blur(8px)";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
          prevImage();
        } else if (e.key === "ArrowRight") {
          nextImage();
        } else if (e.key === "Escape") {
          onClose();
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);

        document.body.style.overflow = "unset";
        document.body.style.paddingRight = "0px";
        const background =
          document.getElementById("app-background");
        const content = document.getElementById("app-content");
        const navigation =
          document.getElementById("app-navigation");
        if (background) background.style.filter = "none";
        if (content) content.style.filter = "none";
        if (navigation) navigation.style.filter = "none";
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const budgetInfo = {
    budget: {
      label: "Budget",
      icon: "$",
      gradient: "from-emerald-500 to-teal-600",
    },
    moderate: {
      label: "Moderate",
      icon: "$$",
      gradient: "from-sky-500 to-blue-600",
    },
    luxury: {
      label: "Luxury",
      icon: "$$$",
      gradient: "from-orange-500 to-amber-600",
    },
  };

  const budget = budgetInfo[destination.budget];

  const difficultyInfo = destination.difficulty
    ? {
        easy: {
          label: "Easy",
          gradient: "from-emerald-500 to-teal-600",
        },
        moderate: {
          label: "Moderate",
          gradient: "from-amber-500 to-orange-600",
        },
        challenging: {
          label: "Challenging",
          gradient: "from-rose-500 to-red-600",
        },
      }[destination.difficulty]
    : null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Image */}
        <div className="relative h-64">
          <img
            src={images[currentImageIndex]}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-black/30 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-black/50 transition-all duration-300 group"
          >
            <X className="w-5 h-5 text-white transition-transform" />
          </button>

          {/* Title */}
          <div className="absolute bottom-3 left-4 right-4">
            <h2 className="text-white mb-0.5 drop-shadow-2xl text-3xl">
              {destination.name}
            </h2>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{destination.country}</span>
            </div>
          </div>

          {/* Image Navigation */}
          {hasMultipleImages && (
            <>
              <button
                onClick={prevImage}
                disabled={isFirstImage}
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-200 ${
                  isFirstImage
                    ? "cursor-not-allowed opacity-30"
                    : "hover:scale-125 opacity-80 hover:opacity-100"
                }`}
              >
                <ChevronLeft
                  className={`w-8 h-8 ${isFirstImage ? "text-white/50" : "text-white drop-shadow-2xl cursor-pointer"}`}
                  strokeWidth={2.5}
                />
              </button>

              <button
                onClick={nextImage}
                disabled={isLastImage}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-200 ${
                  isLastImage
                    ? "cursor-not-allowed opacity-30"
                    : "hover:scale-125 opacity-80 hover:opacity-100"
                }`}
              >
                <ChevronRight
                  className={`w-8 h-8 ${isLastImage ? "text-white/50" : "text-white drop-shadow-2xl cursor-pointer"}`}
                  strokeWidth={2.5}
                />
              </button>
            </>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="m-2 p-5 pr-4 overflow-y-auto max-h-[calc(90vh-16rem)] modal-scroll">
          {/* Description */}
          <p className="text-gray-700 mb-3 leading-relaxed text-base">
            {destination.description}
          </p>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="flex items-center gap-2 px-2.5 py-1.5 bg-orange-50 rounded-lg border border-orange-200">
              <ThermometerSun className="w-4 h-4 text-orange-600 flex-shrink-0" />
              <div>
                <div className="text-[10px] text-orange-600">
                  Temperature
                </div>
                <div className="text-xs text-orange-700">
                  {destination.temperature}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-2.5 py-1.5 bg-sky-50 rounded-lg border border-sky-200">
              <Calendar className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <div>
                <div className="text-[10px] text-sky-600">
                  Best Months
                </div>
                <div className="text-xs text-sky-700">
                  {destination.bestMonths
                    .slice(0, 3)
                    .join(", ")}
                </div>
              </div>
            </div>

            <div
              className={`flex items-center gap-2 px-2.5 py-1.5 bg-gradient-to-r ${budget.gradient} rounded-lg text-white`}
            >
              <DollarSign className="w-4 h-4 flex-shrink-0" />
              <div>
                <div className="text-[10px] opacity-90">
                  Budget Level
                </div>
                <div className="text-xs">{budget.label}</div>
              </div>
            </div>

            {destination.flightDuration && (
              <div className="flex items-center gap-2 px-2.5 py-1.5 bg-indigo-50 rounded-lg border border-indigo-200">
                <Plane className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <div>
                  <div className="text-[10px] text-indigo-600">
                    Flight Time
                  </div>
                  <div className="text-xs text-indigo-700">
                    {destination.flightDuration}
                  </div>
                </div>
              </div>
            )}

            {difficultyInfo && (
              <div
                className={`flex items-center gap-2 px-2.5 py-1.5 bg-gradient-to-r ${difficultyInfo.gradient} rounded-lg text-white`}
              >
                <TrendingUp className="w-4 h-4 flex-shrink-0" />
                <div>
                  <div className="text-[10px] opacity-90">
                    Difficulty
                  </div>
                  <div className="text-xs">
                    {difficultyInfo.label}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Activities */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1.5">
              <Star className="w-4 h-4 text-amber-500" />
              <h3 className="text-gray-800 text-sm">
                Top Activities
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {destination.activities.map((activity, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 text-xs"
                >
                  {activity}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1.5">
              <MapPin className="w-4 h-4 text-rose-500" />
              <h3 className="text-gray-800 text-sm">
                Must-See Places
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {destination.highlights.map((highlight, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-cyan-50 text-cyan-700 rounded-lg border border-cyan-200 text-xs"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          {/* Travel Tip */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-3 border border-amber-200">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[10px] mb-0.5 text-gray-800">
                  Pro Tip
                </div>
                <p className="text-gray-700 text-xs leading-relaxed">
                  {destination.travelTip}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}