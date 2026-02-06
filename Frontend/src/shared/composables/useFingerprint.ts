import { useThumbmark } from "@thumbmarkjs/vue";
import { computed } from "vue";
const useTokenFingerprint = () => {
    const { components } = useThumbmark()
    return computed(() => components.value)
}
export default useTokenFingerprint