<template>
  <v-app>
    <!-- Navigation Component -->
    <AppNavigation 
      @login-click="handleLogin"
      @theme-click="handleThemeToggle"
    />

    <!-- Main Content -->
    <v-main class="bg-surface">
      <v-container class="py-8" style="max-width: 78%">
        <!-- GitHub Contributions Graph -->
        <GitHubContributions class="mt-n4" />

        <!-- Search Section - Material Design Search Bar -->
        <v-sheet rounded="pill" elevation="0" color="surface-variant" class="mb-8 pa-1" style="max-width: 600px">
          <v-text-field
            v-model="searchTerm"
            prepend-inner-icon="mdi-magnify"
            variant="plain"
            density="comfortable"
            hide-details
            placeholder="블로그 포스트 검색..."
            clearable
            class="px-4"
          ></v-text-field>
        </v-sheet>

        <v-row>
          <!-- Sidebar -->
          <v-col cols="12" lg="3" class="pr-lg-6">
            <!-- Categories Card -->
            <v-card rounded="xl" elevation="0" color="surface-variant" class="mb-6">
              <v-card-text class="pa-6">
                <h3 class="text-subtitle-1 font-weight-medium mb-4 text-on-surface">Categories</h3>
                <v-list density="compact" class="pa-0 bg-transparent">
                  <v-list-item
                    v-for="category in categories"
                    :key="category"
                    @click="selectedCategory = category"
                    :active="selectedCategory === category"
                    rounded="pill"
                    class="mb-1"
                    color="primary"
                  >
                    <v-list-item-title>
                      {{ category }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>

            <!-- Tags Cloud -->
            <v-card rounded="xl" elevation="0" color="surface-variant">
              <v-card-text class="pa-6">
                <h3 class="text-subtitle-1 font-weight-medium mb-4 text-on-surface">Popular Tags</h3>
                <v-chip-group column>
                  <v-chip
                    v-for="tag in popularTags"
                    :key="tag"
                    size="small"
                    variant="tonal"
                    color="primary"
                    @click="() => {}"
                  >
                    <v-icon start size="x-small">mdi-tag</v-icon>
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Main Content -->
          <v-col cols="12" lg="9" class="pl-lg-2">
            <!-- GitHub Projects Section -->
            <section id="projects" class="mb-12">
              <v-card rounded="xl" elevation="0">
                <v-card-text class="pa-8">
                  <div class="d-flex align-center mb-8">
                    <v-icon size="28" class="mr-3">mdi-github</v-icon>
                    <h2 class="text-h5 font-weight-medium">Featured Projects</h2>
                  </div>
                  
                  <v-row>
                    <v-col
                      v-for="project in projects"
                      :key="project.id"
                      cols="12"
                      md="6"
                    >
                      <v-card 
                        variant="outlined" 
                        rounded="xl"
                        hover
                        class="h-100"
                      >
                        <v-card-text class="pa-6">
                          <div class="d-flex justify-space-between align-start mb-4">
                            <h3 class="text-subtitle-1 font-weight-medium">{{ project.name }}</h3>
                            <div class="d-flex align-center text-body-2 text-medium-emphasis">
                              <v-icon size="16" class="mr-1">mdi-star</v-icon>
                              {{ project.stars }}
                            </div>
                          </div>
                          
                          <p class="text-body-2 text-medium-emphasis mb-4">{{ project.description }}</p>
                          
                          <v-chip-group class="mb-4">
                            <v-chip
                              v-for="tech in project.tech"
                              :key="tech"
                              size="x-small"
                              variant="tonal"
                              color="primary"
                            >
                              {{ tech }}
                            </v-chip>
                          </v-chip-group>
                          
                          <div class="d-flex ga-2">
                            <v-btn
                              :href="project.github"
                              target="_blank"
                              variant="tonal"
                              size="small"
                              rounded="pill"
                              prepend-icon="mdi-github"
                            >
                              Code
                            </v-btn>
                            <v-btn
                              :href="project.demo"
                              target="_blank"
                              variant="tonal"
                              size="small"
                              rounded="pill"
                              prepend-icon="mdi-open-in-new"
                            >
                              Demo
                            </v-btn>
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </section>

            <!-- Blog Posts -->
            <section id="blog">
              <h2 class="text-h5 font-weight-medium mb-6 text-on-surface">Latest Posts</h2>
              
              <v-card
                v-for="post in filteredPosts"
                :key="post.id"
                class="mb-4"
                rounded="xl"
                elevation="0"
                hover
              >
                <v-card-text class="pa-8">
                  <div class="d-flex flex-wrap align-center ga-3 mb-4">
                    <v-chip
                      size="small"
                      variant="tonal"
                      color="primary"
                      prepend-icon="mdi-folder-outline"
                    >
                      {{ post.category }}
                    </v-chip>
                    <span class="text-body-2 text-medium-emphasis d-flex align-center">
                      <v-icon size="16" class="mr-1">mdi-calendar</v-icon>
                      {{ formatDate(post.date) }}
                    </span>
                    <span class="text-body-2 text-medium-emphasis">
                      <v-icon size="16" class="mr-1">mdi-clock-outline</v-icon>
                      {{ post.readTime }}
                    </span>
                  </div>
                  
                  <h3 class="text-h6 font-weight-medium mb-3 text-on-surface cursor-pointer text-primary-hover">
                    {{ post.title }}
                  </h3>
                  
                  <p class="text-body-1 text-medium-emphasis mb-4 line-clamp-2">{{ post.excerpt }}</p>
                  
                  <div class="d-flex align-center justify-space-between">
                    <v-chip-group>
                      <v-chip
                        v-for="tag in post.tags"
                        :key="tag"
                        size="x-small"
                        variant="outlined"
                        prepend-icon="mdi-tag-outline"
                      >
                        {{ tag }}
                      </v-chip>
                    </v-chip-group>
                    
                    <v-btn
                      color="primary"
                      variant="text"
                      rounded="pill"
                      append-icon="mdi-arrow-right"
                    >
                      더 읽기
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>

              <!-- No Results -->
              <v-card v-if="filteredPosts.length === 0" rounded="xl" elevation="0" class="text-center py-12">
                <v-card-text>
                  <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-magnify</v-icon>
                  <h3 class="text-h6 font-weight-medium mb-2">검색 결과가 없습니다</h3>
                  <p class="text-medium-emphasis">다른 키워드로 검색해보세요.</p>
                </v-card-text>
              </v-card>
            </section>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer color="surface-variant" class="mt-12">
      <v-container style="max-width: 78%">
        <v-row align="center" class="py-4">
          <v-col cols="12" md="6">
            <div class="d-flex align-center">
              <div class="bg-primary rounded-circle pa-2 mr-3">
                <v-icon color="white" size="20">mdi-code-braces</v-icon>
              </div>
              <span class="font-weight-medium text-on-surface">Developer Portfolio</span>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="text-md-end">
            <v-btn
              icon="mdi-github"
              variant="text"
              size="small"
              href="https://github.com"
              target="_blank"
              class="mr-2"
            />
            <span class="text-body-2 text-medium-emphasis">© 2024 All rights reserved</span>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>

    <!-- Theme Selection Dialog -->
    <v-dialog
      v-model="themeDialog"
      max-width="500"
      transition="dialog-bottom-transition"
    >
      <v-card rounded="xl">
        <v-card-text class="pa-6">
          <h3 class="text-h6 font-weight-medium mb-6 text-center">Choose Theme</h3>
          
          <!-- Theme Mode Selection -->
          <v-row>
            <v-col cols="6">
              <v-card
                rounded="lg"
                :variant="currentTheme === 'light' ? 'tonal' : 'outlined'"
                @click="selectTheme('light')"
                class="theme-option cursor-pointer pa-4 text-center"
                :color="currentTheme === 'light' ? 'primary' : undefined"
              >
                <v-icon 
                  size="48" 
                  :color="currentTheme === 'light' ? 'primary' : 'grey'"
                  class="mb-3"
                >
                  mdi-brightness-7
                </v-icon>
                <div class="text-subtitle-2 font-weight-medium">Light</div>
                <div class="text-caption text-medium-emphasis">Default theme</div>
              </v-card>
            </v-col>
            
            <v-col cols="6">
              <v-card
                rounded="lg"
                :variant="currentTheme === 'dark' ? 'tonal' : 'outlined'"
                @click="selectTheme('dark')"
                class="theme-option cursor-pointer pa-4 text-center"
                :color="currentTheme === 'dark' ? 'primary' : undefined"
              >
                <v-icon 
                  size="48" 
                  :color="currentTheme === 'dark' ? 'primary' : 'grey'"
                  class="mb-3"
                >
                  mdi-brightness-4
                </v-icon>
                <div class="text-subtitle-2 font-weight-medium">Dark</div>
                <div class="text-caption text-medium-emphasis">Night mode</div>
              </v-card>
            </v-col>
          </v-row>
          
          <v-divider class="my-6"></v-divider>
          
          <!-- Color Palette Selection -->
          <h4 class="text-subtitle-1 font-weight-medium mb-4 text-center">Choose Color Palette</h4>
          
          <v-row>
            <v-col 
              v-for="palette in colorPalettes" 
              :key="palette.value"
              cols="4"
              class="pa-2"
            >
              <v-card
                rounded="lg"
                :variant="currentColor === palette.value ? 'flat' : 'outlined'"
                @click="selectColorPalette(palette)"
                class="cursor-pointer pa-3 text-center"
                :style="{
                  borderColor: currentColor === palette.value 
                    ? (currentTheme === 'light' ? palette.light : palette.dark) 
                    : undefined,
                  borderWidth: currentColor === palette.value ? '2px' : '1px'
                }"
              >
                <div 
                  class="rounded-circle mx-auto mb-2"
                  :style="{
                    width: '40px',
                    height: '40px',
                    backgroundColor: currentTheme === 'light' ? palette.light : palette.dark
                  }"
                ></div>
                <div class="text-caption font-weight-medium">{{ palette.name }}</div>
              </v-card>
            </v-col>
          </v-row>
          
          <v-divider class="my-6"></v-divider>
          
          <div class="text-center">
            <v-btn
              variant="text"
              rounded="pill"
              @click="themeDialog = false"
            >
              Close
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import GitHubContributions from './components/GitHubContributions.vue'
import AppNavigation from './components/AppNavigation.vue'
import { applyThemeColor } from './utils/theme.js'

export default {
  name: 'App',
  components: {
    GitHubContributions,
    AppNavigation
  },
  data() {
    return {
      searchTerm: '',
      selectedCategory: 'All',
      themeDialog: false,
      currentTheme: 'light',
      currentColor: 'blue',
      colorPalettes: [
        {
          name: 'Blue',
          value: 'blue',
          light: '#1976D2',
          dark: '#90CAF9'
        },
        {
          name: 'Purple',
          value: 'purple',
          light: '#9C27B0',
          dark: '#CE93D8'
        },
        {
          name: 'Green',
          value: 'green',
          light: '#4CAF50',
          dark: '#81C784'
        },
        {
          name: 'Orange',
          value: 'orange',
          light: '#FF9800',
          dark: '#FFB74D'
        },
        {
          name: 'Red',
          value: 'red',
          light: '#F44336',
          dark: '#EF5350'
        },
        {
          name: 'Teal',
          value: 'teal',
          light: '#009688',
          dark: '#4DB6AC'
        }
      ],
      categories: ['All', 'React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS'],
      popularTags: ['React', 'JavaScript', 'TypeScript', 'CSS', 'Node.js', 'Frontend', 'Backend'],
      blogPosts: [
        {
          id: 1,
          title: "React 최적화 기법과 성능 향상 방법",
          excerpt: "React 애플리케이션의 성능을 향상시키기 위한 다양한 최적화 기법들을 소개합니다.",
          date: "2024-01-15",
          category: "React",
          tags: ["React", "Performance", "Optimization"],
          readTime: "8분"
        },
        {
          id: 2,
          title: "JavaScript ES2024 새로운 기능들",
          excerpt: "ES2024에서 새롭게 추가된 JavaScript 기능들과 실무에서의 활용법을 알아봅시다.",
          date: "2024-01-10",
          category: "JavaScript",
          tags: ["JavaScript", "ES2024", "Frontend"],
          readTime: "12분"
        },
        {
          id: 3,
          title: "TypeScript 고급 타입 활용하기",
          excerpt: "TypeScript의 고급 타입 시스템을 활용하여 더 안전하고 표현력있는 코드를 작성하는 방법",
          date: "2024-01-05",
          category: "TypeScript",
          tags: ["TypeScript", "Types", "Development"],
          readTime: "15분"
        }
      ],
      projects: [
        {
          id: 1,
          name: "E-Commerce Platform",
          description: "React와 Node.js로 구축한 풀스택 이커머스 플랫폼",
          tech: ["React", "Node.js", "MongoDB", "Express"],
          github: "https://github.com/username/ecommerce",
          demo: "https://demo.example.com",
          stars: 234
        },
        {
          id: 2,
          name: "Task Management App",
          description: "팀 협업을 위한 실시간 태스크 관리 애플리케이션",
          tech: ["Vue.js", "Firebase", "Tailwind CSS"],
          github: "https://github.com/username/taskapp",
          demo: "https://taskapp.example.com",
          stars: 156
        }
      ]
    }
  },
  computed: {
    filteredPosts() {
      return this.blogPosts.filter(post => {
        const matchesCategory = this.selectedCategory === 'All' || post.category === this.selectedCategory
        const matchesSearch = post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                             post.excerpt.toLowerCase().includes(this.searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
      })
    }
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('ko-KR')
    },
    handleLogin() {
      // 로그인 처리 로직
      console.log('Login clicked')
      // 여기에 로그인 모달 표시 또는 라우팅 처리
    },
    handleThemeToggle() {
      // 테마 선택 모달 열기
      this.themeDialog = true
    },
    selectTheme(theme) {
      if (this.currentTheme === theme) return
      
      // 테마 변경 전에 body에 클래스 추가
      document.body.style.transition = 'none'
      
      this.currentTheme = theme
      this.$vuetify.theme.global.name = theme
      
      // 색상 팔레트 적용
      this.applyColorPalette()
      
      // 로컬 스토리지에 테마 저장
      localStorage.setItem('theme', theme)
      
      // 다음 프레임에서 transition 복원
      requestAnimationFrame(() => {
        document.body.style.transition = ''
      })
    },
    selectColorPalette(palette) {
      console.log('Selecting color palette:', palette)
      this.currentColor = palette.value
      
      // 색상 팔레트 적용
      this.applyColorPalette()
      
      // 로컬 스토리지에 색상 저장
      localStorage.setItem('colorPalette', palette.value)
    },
    applyColorPalette() {
      const palette = this.colorPalettes.find(p => p.value === this.currentColor)
      console.log('Applying palette:', palette)
      if (!palette) return
      
      // transition 일시 중지
      document.body.style.transition = 'none'
      
      // 현재 테마에 맞는 색상 적용
      const currentColor = this.currentTheme === 'light' ? palette.light : palette.dark
      
      // CSS 변수로 직접 색상 적용
      applyThemeColor(currentColor)
      
      // Vuetify 테마 색상도 업데이트
      const themes = this.$vuetify.theme.themes
      themes.light.colors.primary = palette.light
      themes.dark.colors.primary = palette.dark
      
      // transition 복원
      requestAnimationFrame(() => {
        document.body.style.transition = ''
      })
      
      console.log('Applied color:', currentColor)
    },
    darkenColor(color, amount) {
      // 간단한 색상 어둡게 하기 함수
      const num = parseInt(color.replace('#', ''), 16)
      const r = Math.max(0, (num >> 16) - Math.round(255 * amount))
      const g = Math.max(0, ((num >> 8) & 0x00FF) - Math.round(255 * amount))
      const b = Math.max(0, (num & 0x0000FF) - Math.round(255 * amount))
      return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')
    }
  },
  mounted() {
    // 저장된 테마 불러오기
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      this.currentTheme = savedTheme
      this.$vuetify.theme.global.name = savedTheme
    }
    
    // 저장된 색상 팔레트 불러오기
    const savedColor = localStorage.getItem('colorPalette')
    if (savedColor) {
      this.currentColor = savedColor
      this.applyColorPalette()
    }
  }
}
</script>


