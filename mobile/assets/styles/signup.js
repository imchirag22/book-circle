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
    paddingBottom: Platform.OS === 'ios' ? 30 : 100,
    alignItems: 'center',
    minHeight: '100%',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    width: width * 0.35,
    height: width * 0.35,
    marginBottom: 12,
  },
  appTitle: {
    fontSize: 28,
    fontFamily: 'Geist-Bold',
    color: COLORS.textPrimary,
    marginBottom: 5,
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
    fontFamily: 'Geist-SemiBold',
    color: COLORS.textDark,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Geist-Medium',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 16,
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
  eyeIconContainer: {
    padding: 4,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontFamily: 'Geist-Regular',
    color: COLORS.textDark,
  },
  signupButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
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
  signupButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: 'Geist-SemiBold',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: COLORS.textSecondary,
  },
  termsLink: {
    color: COLORS.primary,
    fontFamily: 'Geist-SemiBold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: COLORS.textSecondary,
  },
  loginLink: {
    fontSize: 14,
    fontFamily: 'Geist-SemiBold',
    color: COLORS.primary,
    marginLeft: 4,
  },
});

export default styles;