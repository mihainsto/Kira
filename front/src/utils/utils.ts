
// Mappers for DEMO
export const regionMapper = (code: string): string => {
    const regions: { [key: string]: string } = {
        US: 'United States',
        CA: 'Canada',
        GB: 'United Kingdom',
        // Add more region mappings as needed
    };
    return regions[code] || 'Unknown Region';
};

export const languageMapper = (code: string): string => {
    const languages: { [key: string]: string } = {
        en: 'English',
        es: 'Spanish',
        fr: 'French',
        // Add more language mappings as needed
    };
    return languages[code] || 'Unknown Language';
};

export const currencyMapper = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: amount < 1 ? 2 : 0
    }).format(amount);
};

export const formatNumber = (num: number): string => {
    if (num >= 1_000_000_000) {
        return (num / 1_000_000_000).toFixed(1) + 'b';
    } else if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1) + 'm';
    } else if (num >= 1_000) {
        return (num / 1_000).toFixed(1) + 'k';
    } else {
        return num.toString();
    }
};

export const formatPercentage = (value: number): string => {
    return (value / 100).toFixed(3) + '%';
};

