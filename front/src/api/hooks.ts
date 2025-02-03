// apiHooks.ts
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
    UseDemoKiraBaseDataResponse,
    UseDemoKiraStatsHistoryResponse
} from './types';

export const useDemoKiraBaseData = () => {
    const [data, setData] = useState<UseDemoKiraBaseDataResponse | null>(null);
    const [error, setError] = useState<unknown>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<UseDemoKiraBaseDataResponse>(
                    'https://saas.kyra.com/discovery/creators/5831967/base-data',
                    {
                        headers: {
                            'x-kyra-swagger': 'f583305f-9bc3-42dd-a520-8520483cff5a',
                        },
                    }
                );
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, error, loading };
};

export const useDemoKiraStatsHistory = () => {
    const [data, setData] = useState<UseDemoKiraStatsHistoryResponse | null>(null);
    const [error, setError] = useState<unknown>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<UseDemoKiraStatsHistoryResponse>(
                    'https://saas.kyra.com/discovery/creators/5831967/stats-history',
                    {
                        headers: {
                            'x-kyra-swagger': 'f583305f-9bc3-42dd-a520-8520483cff5a',
                        },
                    }
                );
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, error, loading };
};
