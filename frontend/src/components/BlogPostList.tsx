import React from 'react';
import { useBlog } from '../context/BlogContext';
import {
    Card,
    CardContent,
    Typography,
    Chip,
    Box,
    Divider
} from '@mui/material';
import {
    AccessTime,
    LocalOffer
} from '@mui/icons-material';

const BlogPostList: React.FC = () => {
    const { filteredPosts, selectedCategory } = useBlog();

    const getCategoryDisplayName = (category: string) => {
        const categoryMap: { [key: string]: string } = {
            'all': 'All Posts',
            'development': 'Development',
            'frontend': 'Frontend',
            'backend': 'Backend',
            'devops': 'DevOps',
            'troubleshooting': 'Troubleshooting',
            'bugs': 'Bug Fixes',
            'performance': 'Performance',
            'tips': 'Tips & Tricks',
            'learning': 'Learning',
            'tutorials': 'Tutorials',
            'courses': 'Courses',
            'career': 'Career'
        };
        return categoryMap[category] || category;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getSubcategoryPath = (category: string, subcategory?: string) => {
        if (!subcategory) return getCategoryDisplayName(category);
        return `${getCategoryDisplayName(category)} > ${getCategoryDisplayName(subcategory)}`;
    };

    return (
        <Card variant="outlined" sx={{ borderRadius: 4 }}>
            <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                        {getCategoryDisplayName(selectedCategory)}
                    </Typography>
                    <Chip 
                        label={`${filteredPosts.length}개의 포스트`}
                        size="small" 
                        variant="outlined"
                        sx={{ 
                            fontSize: '0.75rem'
                        }}
                    />
                </Box>

                <Divider sx={{ mb: 3 }} />

                {filteredPosts.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                        <Typography variant="body1" color="text.secondary">
                            선택한 카테고리에 포스트가 없습니다.
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {filteredPosts.map(post => (
                            <Card 
                                key={post.id} 
                                variant="outlined" 
                                sx={{ 
                                    borderRadius: 2,
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: 2
                                    }
                                }}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
                                            {post.title}
                                        </Typography>
                                        <Chip 
                                            label={getSubcategoryPath(post.category, post.subcategory)}
                                            size="small"
                                            color="primary"
                                            variant="outlined"
                                            sx={{ fontSize: '0.7rem' }}
                                        />
                                    </Box>
                                    
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                                        {post.excerpt}
                                    </Typography>
                                    
                                    <Divider sx={{ my: 2 }} />
                                    
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                            <Typography variant="caption" color="text.secondary">
                                                {formatDate(post.publishedAt)}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <AccessTime sx={{ fontSize: 14 }} color="disabled" />
                                                <Typography variant="caption" color="text.secondary">
                                                    {post.readTime}분 읽기
                                                </Typography>
                                            </Box>
                                        </Box>
                                        
                                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                            {post.tags.slice(0, 3).map(tag => (
                                                <Chip
                                                    key={tag}
                                                    label={tag}
                                                    size="small"
                                                    variant="outlined"
                                                    icon={<LocalOffer sx={{ fontSize: 12 }} />}
                                                    sx={{ 
                                                        fontSize: '0.7rem',
                                                        height: 20
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default BlogPostList;
