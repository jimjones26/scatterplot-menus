import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
  const dataUrl: string = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/iris.csv'
  const res = await fetch(dataUrl)

  return { data: await res.text() };
};