import { View } from '../types/View';

export function sortViewsByPlace(views: View[]): View[] {
  return views.sort((a: View, b: View) => {
    return a.place - b.place;
  });
}
