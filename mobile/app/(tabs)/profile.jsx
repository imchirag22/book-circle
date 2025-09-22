import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import COLORS from '../../constants/Colors';
import Feather from '@expo/vector-icons/Feather';
import { useAuthStore } from '../../store/authStore';
import { router } from 'expo-router';

const Profile = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)');
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Image source={{ uri: user.profilePicture }} style={styles.avatarImage} />
            </View>
          </View>
          <Text style={styles.name}>{user.userName}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Books Read</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Books Owned</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>

        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Feather name="settings" size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.menuText}>Settings</Text>
            <Feather name="chevron-right" size={16} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Feather name="book-open" size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.menuText}>Reading Goals</Text>
            <Feather name="chevron-right" size={16} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Feather name="heart" size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.menuText}>Favorites</Text>
            <Feather name="chevron-right" size={16} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Feather name="help-circle" size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.menuText}>Help & Support</Text>
            <Feather name="chevron-right" size={16} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout} style={[styles.menuItem, styles.logoutItem]}>
            <View style={styles.menuIcon}>
              <Feather name="log-out" size={20} color="#FF4444" />
            </View>
            <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
            <Feather name="chevron-right" size={16} color={COLORS.textSecondary} />
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
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: COLORS.cardBackground,
    margin: 20,
    borderRadius: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  menu: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  logoutItem: {
    marginTop: 20,
  },
  logoutText: {
    color: '#FF4444',
  },
})

export default Profile
