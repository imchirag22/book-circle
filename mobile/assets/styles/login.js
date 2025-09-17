import { StyleSheet, Dimensions, Platform } from 'react-native';
import COLORS from '../../constants/Colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flexGrow: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: height * 0.05,
    paddingBottom: 30,
    alignItems: 'center',
    minHeight: '100%',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 28,
    fontFamily: 'Geist-Bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  appTagline: {
    fontSize: 16,
    fontFamily: 'Geist-Regular',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 10,
  },
  formCard: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 24,
      },
      android: {
        elevation: 8,
      },
    }),
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 22,
    fontFamily: 'Geist-Bold',
    color: COLORS.textDark,
    marginBottom: 28,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Geist-SemiBold',
    color: COLORS.textPrimary,
    marginBottom: 8,
    paddingLeft: 8
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    height: 56,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  inputIcon: {
    marginRight: 12,
    
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: COLORS.textDark,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: COLORS.primary,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: 'Geist-SemiBold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  orText: {
    paddingHorizontal: 16,
    color: COLORS.textSecondary,
    fontSize: 14,
    fontFamily: 'Geist-Regular',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 16,
    width: '48%',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  socialButtonIcon: {
    marginRight: 8,
  },
  socialButtonText: {
    fontSize: 14,
    fontFamily: 'Geist-Medium',
    color: COLORS.textDark,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signupText: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: COLORS.textSecondary,
  },
  signupLink: {
    fontSize: 14,
    fontFamily: 'Geist-SemiBold',
    color: COLORS.primary,
    marginLeft: 4,
  },
});

export default styles;