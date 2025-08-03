import React, { useMemo } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
} from '@mui/material';

interface ContributionDay {
    date: Date;
    count: number;
    level: number;
}

const generateContributionData = (): ContributionDay[] => {
    const data: ContributionDay[] = [];
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth() - 11, 1);

    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
        const count = Math.floor(Math.random() * 8);
        data.push({
            date: new Date(d),
            count,
            level:
                count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4,
        });
    }
    return data;
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const GitHubContributions: React.FC = () => {
    const contributionData = useMemo<ContributionDay[]>(() => generateContributionData(), []);

    const totalContributions = contributionData.reduce((sum, d) => sum + d.count, 0);

    const weeks = useMemo<ContributionDay[][]>(() => {
        const weeks: ContributionDay[][] = [];
        let currentWeek: ContributionDay[] = [];

        contributionData.forEach((day, index) => {
            if (day.date.getDay() === 0 && currentWeek.length > 0) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
            currentWeek.push(day);

            if (index === contributionData.length - 1) {
                weeks.push(currentWeek);
            }
        });

        return weeks;
    }, [contributionData]);

    const getBoxColor = (level: number): string => {
        const colors = ['#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5'];
        return colors[level];
    };

    const getTooltip = (day: ContributionDay): string =>
        `${day.count} contributions on ${day.date.toLocaleDateString()}`;

    return (
        <Card variant="outlined" sx={{ borderRadius: 4, mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
                {/*<Box id = "A"*/}
                {/*    sx={{*/}
                {/*        bgcolor: 'background.default',*/}
                {/*        borderRadius: 2,*/}
                {/*        px: 2,*/}
                {/*        py: 2,*/}
                {/*        overflowX: 'auto',*/}
                {/*    }}*/}
                {/*>*/}
                    <Box sx={{ minWidth: 700, mx: 'auto' }}>
                        <Box display="flex" mt={2} mb={2}>
                            <Box sx={{ width: 48 }} />
                            <Box flexGrow={1} display="flex" justifyContent="space-between">
                                {months.map((month, index) => (
                                    <Typography
                                        key={month}
                                        variant="caption"
                                        color="text.secondary"
                                        align="center"
                                        sx={{ flexGrow: 1 }}
                                    >
                                        {index % 2 === 0 ? month : ''}
                                    </Typography>
                                ))}
                            </Box>
                        </Box>

                        <Box display="flex">
                            <Box
                                sx={{
                                    width: 48,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    mr: 2,
                                }}
                            >
                                {days.map((day, index) => (
                                    <Typography
                                        key={day}
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{
                                            height: 13,
                                            mb: 0.4,
                                            pr: 1,
                                            textAlign: 'right',
                                            visibility: index % 2 === 1 ? 'visible' : 'hidden',
                                        }}
                                    >
                                        {day.slice(0, 3)}
                                    </Typography>
                                ))}
                            </Box>

                            <Box flexGrow={1} display="flex" justifyContent="space-between">
                                {weeks.map((week, i) => (
                                    <Box
                                        key={i}
                                        display="flex"
                                        flexDirection="column"
                                        sx={{ width: `${100 / weeks.length}%` }}
                                    >
                                        {[...Array(7)].map((_, dayIndex) => {
                                            const day = week.find((d) => d.date.getDay() === dayIndex);
                                            const level = day ? day.level : 0;
                                            return (
                                                <Box
                                                    key={dayIndex}
                                                    title={day ? getTooltip(day) : 'No contributions'}
                                                    sx={{
                                                        width: '100%',
                                                        aspectRatio: '1',
                                                        maxWidth: 13,
                                                        maxHeight: 13,
                                                        bgcolor: getBoxColor(level),
                                                        borderRadius: 1,
                                                        mb: 0.4,
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                            );
                                        })}
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>{totalContributions}</strong> contributions in the last year
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Typography variant="caption" color="text.secondary" mr={1}>
                                    Less
                                </Typography>
                                <Box display="flex" gap={0.5}>
                                    {[0, 1, 2, 3, 4].map((level) => (
                                        <Box
                                            key={level}
                                            sx={{
                                                width: 13,
                                                height: 13,
                                                bgcolor: getBoxColor(level),
                                                borderRadius: 1,
                                            }}
                                        />
                                    ))}
                                </Box>
                                <Typography variant="caption" color="text.secondary" ml={1}>
                                    More
                                </Typography>
                            </Box>
                        </Box>
                    {/*</Box>*/}
                </Box>
            </CardContent>
        </Card>
    );
};

export default GitHubContributions;
