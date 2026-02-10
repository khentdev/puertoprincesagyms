import { ref, computed, onMounted, onUnmounted } from 'vue';

export function useDeviceDetection() {
    const windowWidth = ref(window.innerWidth);

    const MOBILE_MAX = 767;
    const TABLET_MAX = 1023;
    const DESKTOP_MIN = 1024;

    const updateWidth = () => {
        windowWidth.value = window.innerWidth;
    };

    const isMobile = computed(() => windowWidth.value <= MOBILE_MAX);
    const isTablet = computed(() => windowWidth.value > MOBILE_MAX && windowWidth.value <= TABLET_MAX);
    const isDesktop = computed(() => windowWidth.value >= DESKTOP_MIN);


    onMounted(() => {
        window.addEventListener('resize', updateWidth);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', updateWidth);
    });

    return {
        windowWidth,
        isMobile,
        isTablet,
        isDesktop,
    };
}