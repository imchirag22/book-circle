import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import COLORS from '../../constants/Colors'
import Feather from '@expo/vector-icons/Feather'

const AddBook = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Add New Book</Text>
          <Text style={styles.subtitle}>Fill in the details to add a book to your collection</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Book Title</Text>
            <View style={styles.inputWrapper}>
              <Feather name="book" size={20} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter book title"
                placeholderTextColor={COLORS.placeholderText}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Author</Text>
            <View style={styles.inputWrapper}>
              <Feather name="user" size={20} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter author name"
                placeholderTextColor={COLORS.placeholderText}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>ISBN</Text>
            <View style={styles.inputWrapper}>
              <Feather name="hash" size={20} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter ISBN (optional)"
                placeholderTextColor={COLORS.placeholderText}
                keyboardType="numeric"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.addButton}>
            <Feather name="plus" size={20} color={COLORS.white} />
            <Text style={styles.addButtonText}>Add Book</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    height: 50,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 50,
    marginTop: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
})

export default AddBook
