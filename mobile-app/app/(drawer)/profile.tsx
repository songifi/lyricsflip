import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
} from "react-native";
import { Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import index from "./(tabs)";
const argent = require("@/assets/images/argent.png");
const musicBadge = require("@/assets/images/musicBadge.png");
import { LineChart } from "react-native-chart-kit";
import EarningsChart from "@/components/EarningsChart";

export default function profile() {
  const badges = [
    { id: 1, title: "Music Connoisseur", image: musicBadge },
    { id: 2, title: "Music Connoisseur", image: musicBadge },
    { id: 3, title: "Music Connoisseur", image: musicBadge },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Feather name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} /> {/* Placeholder for alignment */}
      </View>

      {/* Avatar and Wallet Info */}
      <View style={styles.avatarAndWalletContainer}>
        <Image
          style={styles.imageAvatar}
          source={require("../../assets/images/avatar.png")}
        />
        <View>
          <Text style={{ fontWeight: 500, fontSize: 20 }}>theOxneedeth</Text>
          <Text style={{ fontWeight: 400, fontSize: 12, color: "#666666" }}>
            0x05e8c...d4b08fd4637c
          </Text>
        </View>
      </View>

      <View>
        <Text style={{ paddingHorizontal: 20, fontWeight: 400, fontSize: 16 }}>
          PROFILE
        </Text>
      </View>

      {/* Username View */}
      <TouchableOpacity style={styles.menuItem}>
        <Text>Username</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "#9747FF" }}>theOxneedeth</Text>
          <Feather name="chevron-right" size={24} color={"#5A5B5C"} />
        </View>
      </TouchableOpacity>

      {/* Wallet */}
      <TouchableOpacity style={styles.menuItem}>
        <Text>Wallet</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.walletItem}>
            <Image source={argent} style={styles.argentIcon} />
            <Text style={{ color: "#9747FF", fontSize: 12 }}>
              0x05e...4637c
            </Text>
          </View>
          <Feather name="chevron-right" size={24} color={"#5A5B5C"} />
        </View>
      </TouchableOpacity>

      {/* Overview */}
      <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16 }}>OVERVIEW</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#9747FF" }}>See all</Text>
            <Feather name="chevron-right" color={"#9747FF"} size={24} />
          </View>
        </View>

        {/* Overview Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>870</Text>
            <Text style={{ fontSize: 14, fontWeight: 400, color: "#666666" }}>
              Total Games Played
            </Text>
          </View>
          <View style={[styles.statItem, styles.statDivider]}>
            <Text style={styles.statNumber}>678</Text>
            <Text style={{ fontSize: 14, fontWeight: 400, color: "#666666" }}>
              Total Games Won
            </Text>
          </View>
        </View>
      </View>

      {/* Badges */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={{ fontSize: 16 }}>BADGES</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "#9747FF" }}>See all</Text>
            <Feather name="chevron-right" color={"#9747FF"} size={24} />
          </View>
        </View>

        {/* Badges Card */}
        <View style={styles.badgesCard}>
          <FlatList
            data={badges}
            renderItem={({ item }) => (
              <View style={{ alignItems: "center", marginHorizontal: 12 }}>
                <Image source={item.image} style={{ height: 48, width: 48 }} />
                <Text style={{ fontSize: 9, textAlign: "center" }}>
                  {item.title}
                </Text>
              </View>
            )}
            // keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: "space-between",
            }}
          />
        </View>
      </View>

      {/* Statistics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>STATISTICS</Text>

        <View style={styles.earningsCard}>
          <Text style={styles.earningsLabel}>Your Earnings</Text>
          <Text style={styles.earningsAmount}>$ 24,000.00</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              marginTop: 4,
            }}
          >
            <Text style={styles.earningsChange}>+$100 (10%)</Text>
            <Text style={styles.earningsSubtext}>Total returns</Text>
          </View>

          <EarningsChart />
          <View style={styles.container}></View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  avatarAndWalletContainer: {
    alignItems: "center",
    paddingVertical: 24,
    borderColor: "#DBE1E7",
  },
  imageAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    // fontWeight: "600",
    // paddingHorizontal: 20,
    // marginTop: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#DBE2E8",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  wallet: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#DBE2E8",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  walletItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#DBE1E7",
    borderRadius: 50,
    paddingVertical: 5,
    paddingLeft: 8,
    paddingRight: 8,
  },
  argentIcon: {
    width: 16,
    height: 15,
    marginRight: 4,
  },
  statsCard: {
    flexDirection: "row",
    // alignItems: "center",
    borderWidth: 1,
    borderColor: "#DBE2E8",
    borderRadius: 8,
    // paddingVertical: 2,
    marginTop: 12,
  },
  statItem: {
    flex: 1,
    padding: 12,
  },
  statDivider: {
    borderLeftWidth: 1,
    borderColor: "#DBE2E8",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 36,
  },
  badgesCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#DBE2E8",
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  earningsCard: {
    borderWidth: 1,
    borderColor: "#DBE2E8",
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 10,
    padding: 16,
  },
  earningsLabel: {
    fontSize: 14,
    color: "#666666",
  },
  earningsAmount: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 4,
  },
  earningsChange: {
    fontSize: 12,
    color: "#0AC660",
  },
  earningsSubtext: {
    fontSize: 12,
    color: "#929292",
  },
  tooltipContent: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DBE2E8",
    borderRadius: 4,
    padding: 8,
  },
  tooltipLabel: {
    color: "#666666",
    fontWeight: "bold",
  },
  tooltipItem: {
    color: "#9747FF",
  },
});
