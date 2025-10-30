// Если мы таким образом объявляем переменную вне функции, то это состояние будет глобальным, и его можно будет использовать везде в приложении
const menuOpen = ref(false)
export const useMenu = () => {
  const toggleMenu = () => (menuOpen.value = !menuOpen.value)

  return {
    menuOpen,
    toggleMenu
  }
}
