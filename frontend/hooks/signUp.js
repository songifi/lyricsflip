export const signUp = async (data) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
  
    // Simulate API call
    // In a real application, you would make an actual API call here
    if (Math.random() > 0.2) {
      // 80% success rate
      return { success: true }
    } else {
      throw new Error("Signup failed")
    }
  }
  
  