export function convertBlobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(blob);
  });
}

export const isImageFile = (file: File): boolean => {
  const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  return imageMimeTypes.includes(file.type);
};

export const getImageBlobToFetch = async (url: string) => {
  // const token = tokenLib();

  const responseImage = await fetch(url, {
    headers: {
      Authorization: `Bearer ${''}`,
    },
  });

  return await responseImage.blob();
};

export const blobToDataURL = (
  blob: Blob,
  callback: (dataUrl: string | ArrayBuffer | null) => void,
) => {
  const reader = new FileReader();
  reader.onload = function (e) {
    callback(e.target?.result ?? '');
  };
  reader.readAsDataURL(blob);
};

export const fileSizeFormatter = (
  sizeInBytes: number,
): { sizeInKB: number; sizeInMB: number; isUnder1MB: boolean } => {
  const sizeInKB = sizeInBytes / 1024;
  const sizeInMB = sizeInKB / 1024;

  return { sizeInKB, sizeInMB, isUnder1MB: sizeInKB < 1024 };
};

export const fileSizeInMB = (sizeInBytes: number): number => {
  return sizeInBytes / (1024 * 1024);
};

export function isExtensionAllowed({
  extensions,
  fileName,
}: {
  extensions: string[];
  fileName: string;
}) {
  if (fileName === '') {
    return false;
  }

  const fileExtension = '.' + fileName.split('.').pop()?.toLowerCase?.();

  return extensions.includes(fileExtension);
}

export function isExtensionNotAllowed({
  extensions,
  fileName,
  mergedCompare = false,
}: {
  extensions?: string[];
  fileName: string;
  mergedCompare: boolean;
}) {
  const defaultExtensions = [
    '.ace',
    '.ade',
    '.adp',
    '.asp',
    '.aspx',
    '.bat',
    '.chm',
    '.cmd',
    '.com',
    '.cpl',
    '.crt',
    '.exe',
    '.gz',
    '.hlp',
    '.hta',
    '.htm',
    '.html',
    '.in',
    '.inf',
    '.mdb',
    '.mde',
    '.msc',
    '.msi',
    '.ink',
    '.ins',
    '.isp',
    '.js',
    '.jse',
    '.jsp',
    '.lnk',
    '.msp',
    '.mst',
    '.pcd',
    '.php',
    '.php3',
    '.php4',
    '.phps',
    '.pi',
    '.pif',
    '.reg',
    '.scr',
    '.sct',
    '.shs',
    '.url',
    '.vb',
    '.vbe',
    '.vbs',
    '.wsc',
    '.wsf',
    '.wsh',
    '.xml',
  ];

  if (fileName === '') {
    return false;
  }

  const fileExtension = '.' + fileName.split('.').pop()?.toLowerCase?.();

  if (extensions && extensions.length > 0) {
    if (mergedCompare) {
      return [...defaultExtensions, ...extensions].includes(fileExtension);
    }

    return extensions.includes(fileExtension);
  }

  return defaultExtensions.includes(fileExtension);
}

export function extractBase64ImageSrc(str: string): string[] {
  const regex = /<img src="(data:image\/[a-zA-Z]+;base64,[^"]+)"/g;
  const matches = [...str.matchAll(regex)];

  if (matches.length === 0) {
    return [];
  }

  return matches.map((match) => match[1]);
}

export function getExtensionFromMimeType(mimeType: string): string {
  const mimeExtensionMap: { [key: string]: string } = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'application/octet-stream': '.jpg',
  };

  return mimeExtensionMap[mimeType] || '';
}

export function base64ToFile(base64String: string, baseFilename: string): File | null {
  const match = base64String.match(/data:(.*?);base64,/);

  if (!match) {
    console.error('Invalid base64 string');
    return null;
  }

  const mimeType: string = match[1] || 'application/octet-stream';
  const extension: string = getExtensionFromMimeType(mimeType);
  const filename = `${baseFilename}${extension}`;

  const base64Data: string | undefined = base64String.split(';base64,').pop();
  if (!base64Data) {
    console.error('Failed to extract base64 data');
    return null;
  }

  const byteCharacters: string = atob(base64Data);
  const byteArrays: Uint8Array[] = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice: string = byteCharacters.slice(offset, offset + 512);
    const byteNumbers: number[] = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray: Uint8Array = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob: Blob = new Blob(byteArrays, { type: mimeType });

  return new File([blob], filename, { type: mimeType });
}
