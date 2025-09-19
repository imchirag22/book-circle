import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import COLORS from '../../constants/Colors'
import styles from '../../assets/styles/signup'
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { Link } from 'expo-router';
import { useAuthStore } from '../../store/authStore';


const Signup = () => {
  
  const [email,setEmail] = useState("")
  const [userName,setuserName] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  

  const { signup, isLoading } = useAuthStore()

  const handleSignUp = async() => {
    const result = await signup(userName,email,password )
    if (!result) Alert.alert("Error", result.error)
  }
  return (
    
    <View style={styles.container}>
       <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        style={{ flex: 1 }}
      > 
      <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets={true}
          contentInsetAdjustmentBehavior="automatic"
        >
          <View style={styles.headerContainer}>
            <Text style={styles.appTitle}>BookCircle</Text>
          </View>
          <View style={styles.formCard}>
            <Text style={styles.formTitle}> Welcome </Text>
            {/* name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style = {styles.inputWrapper}>
              <Feather name="user" size={20} color={COLORS.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your Full Name"
                  placeholderTextColor={COLORS.placeholderText}
                  value={userName}
                  onChangeText={setuserName}
                  autoCapitalize="none"
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style = {styles.inputWrapper}>
              <Feather name="mail" size={20} color={COLORS.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your email address"
                  placeholderTextColor={COLORS.placeholderText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <Feather name="lock" size={20} color={COLORS.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather name={showPassword ? "eye" : "eye-off"} size={20} color={COLORS.primary} style={styles.inputIcon}  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.signupButton}
              onPress={handleSignUp}
              disabled={isLoading}
              >
              <Text style={styles.signupButtonText}>{isLoading ? (<ActivityIndicator color={"white"}/>) : "Sign Up" }
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <Link href="/" asChild> 
            <TouchableOpacity>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
            </Link>
          </View>
          
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default Signup