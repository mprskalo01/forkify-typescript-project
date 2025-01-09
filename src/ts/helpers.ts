import { TIMEOUT_SECONDS } from './config';
import { ApiResponse, POSTRecipe } from './interfaces/Interfaces';

const timeout = function (s: number): Promise<never> {
  return new Promise(function (
    _: (value: never) => void,
    reject: (reason?: Error) => void
  ) {
    setTimeout(function (): void {
      reject(
        new Error(
          `Request took too long! Timeout after ${s} second${
            s !== 1 ? 's' : ''
          }`
        )
      );
    }, s * 1000);
  });
};

export const AJAX = async function (
  url: string,
  uploadData: POSTRecipe | undefined = undefined
) {
  const fetchPro = uploadData
    ? fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      })
    : fetch(url);
  try {
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);
    const data: ApiResponse = await res.json();
    
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};
