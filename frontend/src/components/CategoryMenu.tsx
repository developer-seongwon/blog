import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import {
    Card,
    CardContent,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Typography,
    Chip,
    Divider,
    Box
} from '@mui/material';
import {
    ExpandLess,
    ExpandMore,
    Article,
    Code,
    BugReport,
    TipsAndUpdates,
    School,
    Work,
    Web,
    Storage,
    Cloud
} from '@mui/icons-material';

interface Category {
    id: string;
    name: string;
    icon: React.ReactNode;
    subcategories?: Category[];
}

const CategoryMenu: React.FC = () => {
    const { selectedCategory, setSelectedCategory, posts } = useBlog();
    const [expandedCategories, setExpandedCategories] = useState<string[]>(['development']);

    // 카테고리별 포스트 수 계산
    const getCategoryPostCount = (categoryId: string) => {
        if (categoryId === 'all') {
            return posts.length;
        }
        return posts.filter(post => 
            post.category === categoryId || post.subcategory === categoryId
        ).length;
    };

    // 카테고리 데이터
    const categories: Category[] = [
        {
            id: 'development',
            name: 'Development',
            icon: <Code />,
            subcategories: [
                { id: 'frontend', name: 'Frontend', icon: <Web /> },
                { id: 'backend', name: 'Backend', icon: <Storage /> },
                { id: 'devops', name: 'DevOps', icon: <Cloud /> }
            ]
        },
        {
            id: 'troubleshooting',
            name: 'Troubleshooting',
            icon: <BugReport />,
            subcategories: [
                { id: 'bugs', name: 'Bug Fixes', icon: <BugReport /> },
                { id: 'performance', name: 'Performance', icon: <TipsAndUpdates /> }
            ]
        },
        {
            id: 'tips',
            name: 'Tips & Tricks',
            icon: <TipsAndUpdates />
        },
        {
            id: 'learning',
            name: 'Learning',
            icon: <School />,
            subcategories: [
                { id: 'courses', name: 'Courses', icon: <School /> },
                { id: 'tutorials', name: 'Tutorials', icon: <Article /> }
            ]
        },
        {
            id: 'career',
            name: 'Career',
            icon: <Work />
        }
    ];

    const handleCategoryToggle = (categoryId: string) => {
        setExpandedCategories(prev => 
            prev.includes(categoryId) 
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    const renderCategory = (category: Category, isSubcategory: boolean = false) => {
        const isExpanded = expandedCategories.includes(category.id);
        const isSelected = selectedCategory === category.id;
        const hasSubcategories = category.subcategories && category.subcategories.length > 0;
        const postCount = getCategoryPostCount(category.id);

        return (
            <React.Fragment key={category.id}>
                <ListItem disablePadding sx={{ pl: isSubcategory ? 4 : 0 }}>
                    <ListItemButton
                        selected={isSelected}
                        onClick={() => {
                            handleCategorySelect(category.id);
                            if (hasSubcategories) {
                                handleCategoryToggle(category.id);
                            }
                        }}
                        sx={{
                            borderRadius: 1,
                            mx: 1,
                            '&.Mui-selected': {
                                backgroundColor: 'primary.main',
                                color: 'primary.contrastText',
                                '&:hover': {
                                    backgroundColor: 'primary.dark',
                                },
                                '& .MuiListItemIcon-root': {
                                    color: 'primary.contrastText',
                                },
                                '& .MuiChip-root': {
                                    backgroundColor: 'primary.contrastText',
                                    color: 'primary.main',
                                }
                            }
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            {category.icon}
                        </ListItemIcon>
                        <ListItemText 
                            primary={category.name}
                            primaryTypographyProps={{
                                variant: isSubcategory ? 'body2' : 'body1',
                                fontWeight: isSubcategory ? 400 : 500
                            }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip 
                                label={postCount} 
                                size="small" 
                                variant="outlined"
                                sx={{ 
                                    minWidth: 32,
                                    height: 20,
                                    fontSize: '0.75rem'
                                }}
                            />
                            {hasSubcategories && (
                                isExpanded ? <ExpandLess /> : <ExpandMore />
                            )}
                        </Box>
                    </ListItemButton>
                </ListItem>
                
                {hasSubcategories && (
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {category.subcategories?.map(subcategory => 
                                renderCategory(subcategory, true)
                            )}
                        </List>
                    </Collapse>
                )}
            </React.Fragment>
        );
    };

    return (
        <Card 
            variant="outlined"
            sx={{ 
                borderRadius: 4,
                width: '100%'
            }}
        >
            <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                    Categories
                </Typography>
                
                <Divider sx={{ mb: 2 }} />
                
                <List sx={{ py: 0 }}>
                    {/* All Posts 옵션 */}
                    <ListItem disablePadding>
                        <ListItemButton
                            selected={selectedCategory === 'all'}
                            onClick={() => handleCategorySelect('all')}
                            sx={{
                                borderRadius: 1,
                                mx: 1,
                                '&.Mui-selected': {
                                    backgroundColor: 'primary.main',
                                    color: 'primary.contrastText',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                    },
                                    '& .MuiListItemIcon-root': {
                                        color: 'primary.contrastText',
                                    },
                                    '& .MuiChip-root': {
                                        backgroundColor: 'primary.contrastText',
                                        color: 'primary.main',
                                    }
                                }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <Article />
                            </ListItemIcon>
                            <ListItemText 
                                primary="All Posts"
                                primaryTypographyProps={{
                                    fontWeight: 500
                                }}
                            />
                            <Chip 
                                label={getCategoryPostCount('all')} 
                                size="small" 
                                variant="outlined"
                                sx={{ 
                                    minWidth: 32,
                                    height: 20,
                                    fontSize: '0.75rem'
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    
                    <Divider sx={{ my: 1, mx: 2 }} />
                    
                    {/* 카테고리 목록 */}
                    {categories.map(category => renderCategory(category))}
                </List>
            </CardContent>
        </Card>
    );
};

export default CategoryMenu;
