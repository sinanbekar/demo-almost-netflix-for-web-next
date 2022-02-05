import { AppwriteService } from '@/services/appwrite';

export const capitalizeString = (text: string) => {
  const capitalized = text.charAt(0).toUpperCase() + text.slice(1);
  return capitalized;
};

export const getSrcMainThumbnail = (imageId: string) => {
  return AppwriteService.getMainThumbnail(imageId);
};

export const getSrcThumbnail = (imageId: string) => {
  return AppwriteService.getThumbnail(imageId);
};

export const getVerboseDate = (unix: number) => {
  const date = new Date(unix * 1000);
  return date.getFullYear();
};

export const getVerboseDuration = (duration: number) => {
  if (duration > 60) {
    const hours = Math.floor(duration / 60);
    const minutes = duration - 60 * hours;

    if (minutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  } else {
    return `${duration}m`;
  }
};
