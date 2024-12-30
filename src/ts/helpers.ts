import { TIMEOUT_SECONDS } from './config';
import { ApiResponse } from './interfaces/Interfaces';

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

export const getJSON = async function (url: string): Promise<ApiResponse> {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
    const data: ApiResponse = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};
