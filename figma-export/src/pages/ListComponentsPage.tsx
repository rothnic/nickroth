import { motion } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useNavigate } from '../utils/router';
import { ArrowLeft, User, Settings, Mail, Bell, ChevronRight, Home, Folder, FileText, Search, Plus, Download, Trash2, Edit, Share, Star } from 'lucide-react';

// Reusable Components
import { SplitHeading } from '../components/demo/SplitHeading';
import { BoxedHeading } from '../components/demo/BoxedHeading';
import { DisplayHeading } from '../components/demo/DisplayHeading';
import { Text } from '../components/demo/Text';
import { IconButton } from '../components/demo/IconButton';

// List Components
import { ListItem, ListSeparator, ListHeading, ListContainer } from '../components/demo/ListItem';
import { StickerBadge } from '../components/StickerBadge';

export function ListComponentsPage() {
  const { navigate } = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main id="main" className="pt-20">
        {/* Header */}
        <section className="py-16 bg-gradient-to-br from-white via-purple-50 to-pink-50 relative texture-grain">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Back button */}
              <IconButton
                variant="black"
                size="md"
                onClick={() => navigate('/demo')}
                className="mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Demo
              </IconButton>

              <div className="text-center">
                <SplitHeading
                  words={[
                    { text: "LIST", variant: "black" },
                    { text: "COMPONENTS", variant: "gradient" }
                  ]}
                  size="4xl"
                  className="mb-6"
                />
                
                <Text size="xl" className="max-w-3xl mx-auto mb-8">
                  Clean, <strong>content-focused list components</strong> for navigation, dropdowns, and data display. 
                  Subtle interactions with clear hierarchy and accessible design patterns.
                </Text>

                <div className="flex flex-wrap gap-4 justify-center">
                  <StickerBadge color="bg-purple-400" rotation={-8}>
                    <Settings className="w-4 h-4 mr-1" />
                    Highly Configurable
                  </StickerBadge>
                  <StickerBadge color="bg-pink-400" rotation={5}>
                    <ChevronRight className="w-4 h-4 mr-1" />
                    Interactive
                  </StickerBadge>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Basic List Items */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <BoxedHeading 
                variant="colored" 
                color="bg-yellow-100" 
                rotation={-2}
                className="mb-8"
              >
                Basic Examples
              </BoxedHeading>
              
              <Text className="max-w-3xl mx-auto mb-12">
                Core list components with different configurations, perfect for navigation menus, 
                action dropdowns, and content organization.
              </Text>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Navigation List */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <DisplayHeading level={3} size="xl" weight="black" className="mb-6">Navigation Menu</DisplayHeading>
                <ListContainer title="Main Navigation" className="max-w-md">
                  <ListItem icon={<Home className="w-5 h-5" />} active={true}>
                    Dashboard
                  </ListItem>
                  <ListItem icon={<User className="w-5 h-5" />}>
                    Profile
                  </ListItem>
                  <ListItem icon={<Settings className="w-5 h-5" />}>
                    Settings
                  </ListItem>
                  <ListSeparator />
                  <ListItem icon={<Mail className="w-5 h-5" />} subtitle="3 unread messages">
                    Messages
                  </ListItem>
                  <ListItem icon={<Bell className="w-5 h-5" />} subtitle="2 new notifications" variant="highlighted">
                    Notifications
                  </ListItem>
                </ListContainer>
              </motion.div>

              {/* Dropdown Menu */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <DisplayHeading level={3} size="xl" weight="black" className="mb-6">Dropdown Actions</DisplayHeading>
                <ListContainer title="File Actions" className="max-w-md">
                  <ListItem icon={<Download className="w-4 h-4" />}>
                    Download
                  </ListItem>
                  <ListItem icon={<Share className="w-4 h-4" />}>
                    Share
                  </ListItem>
                  <ListItem icon={<Star className="w-4 h-4" />}>
                    Add to Favorites
                  </ListItem>
                  <ListSeparator />
                  <ListItem icon={<Edit className="w-4 h-4" />}>
                    Edit
                  </ListItem>
                  <ListItem icon={<Trash2 className="w-4 h-4" />} variant="muted">
                    Delete
                  </ListItem>
                </ListContainer>
              </motion.div>
            </div>
          </div>
        </section>

        {/* List Variants */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <BoxedHeading 
                variant="colored" 
                color="bg-green-100" 
                rotation={2}
                className="mb-8"
              >
                Variants & States
              </BoxedHeading>
              
              <Text className="max-w-3xl mx-auto mb-12">
                Different visual variants and interactive states to communicate hierarchy, 
                status, and user feedback clearly.
              </Text>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Default State */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <DisplayHeading level={4} size="lg" weight="black" className="mb-4">Default Items</DisplayHeading>
                <ListContainer className="max-w-sm">
                  <ListItem>Regular Item</ListItem>
                  <ListItem disabled={true}>Disabled Item</ListItem>
                  <ListItem active={true}>Active Item</ListItem>
                  <ListItem hover={false}>No Hover Effect</ListItem>
                </ListContainer>
              </motion.div>

              {/* With Icons & Subtitles */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <DisplayHeading level={4} size="lg" weight="black" className="mb-4">Rich Content</DisplayHeading>
                <ListContainer className="max-w-sm">
                  <ListItem icon={<Folder className="w-4 h-4" />} subtitle="12 files">
                    Documents
                  </ListItem>
                  <ListItem icon={<FileText className="w-4 h-4" />} subtitle="Last edited today">
                    Report.pdf
                  </ListItem>
                  <ListItem icon={<Search className="w-4 h-4" />} iconPosition="right">
                    Search Files
                  </ListItem>
                </ListContainer>
              </motion.div>

              {/* Variant Styles */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <DisplayHeading level={4} size="lg" weight="black" className="mb-4">Visual Variants</DisplayHeading>
                <ListContainer className="max-w-sm">
                  <ListItem>Default Style</ListItem>
                  <ListItem variant="highlighted">Highlighted Item</ListItem>
                  <ListItem variant="muted">Muted Item</ListItem>
                  <ListItem icon={<Plus className="w-4 h-4" />} variant="highlighted">
                    Add New Item
                  </ListItem>
                </ListContainer>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Collapsible Lists */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <BoxedHeading 
                variant="colored" 
                color="bg-purple-100" 
                rotation={-1}
                className="mb-8"
              >
                Collapsible Sections
              </BoxedHeading>
              
              <Text className="max-w-3xl mx-auto mb-12">
                Expandable list items for organizing complex information hierarchies 
                and progressive disclosure of content.
              </Text>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <ListContainer title="Settings Menu">
                  <ListItem 
                    icon={<User className="w-5 h-5" />}
                    collapsible={true}
                    defaultExpanded={true}
                    expandedContent={
                      <div className="space-y-2">
                        <ListItem className="border-0 shadow-none bg-transparent hover:bg-gray-100">
                          Profile Information
                        </ListItem>
                        <ListItem className="border-0 shadow-none bg-transparent hover:bg-gray-100">
                          Account Security
                        </ListItem>
                        <ListItem className="border-0 shadow-none bg-transparent hover:bg-gray-100">
                          Privacy Settings
                        </ListItem>
                      </div>
                    }
                  >
                    Account
                  </ListItem>
                  <ListItem 
                    icon={<Bell className="w-5 h-5" />}
                    collapsible={true}
                    expandedContent={
                      <div className="space-y-2">
                        <ListItem className="border-0 shadow-none bg-transparent hover:bg-gray-100">
                          Email Notifications
                        </ListItem>
                        <ListItem className="border-0 shadow-none bg-transparent hover:bg-gray-100">
                          Push Notifications
                        </ListItem>
                        <ListItem className="border-0 shadow-none bg-transparent hover:bg-gray-100">
                          SMS Alerts
                        </ListItem>
                      </div>
                    }
                  >
                    Notifications
                  </ListItem>
                  <ListItem icon={<Settings className="w-5 h-5" />}>
                    General Settings
                  </ListItem>
                </ListContainer>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Design Philosophy */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white border-2 border-black p-8 transform rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <DisplayHeading level={2} size="2xl" weight="black" className="mb-6">
                  Content-First Design
                </DisplayHeading>
                <Text className="mb-6">
                  Unlike buttons that need strong visual weight to encourage action, list items prioritize <strong>content hierarchy</strong> and <strong>readability</strong>. 
                  They use subtle hover effects and reduced shadows to create clear navigation without visual noise.
                </Text>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div className="bg-gray-50 border-2 border-black p-4">
                    <Text className="font-bold mb-2 text-green-700">✓ List Items Should:</Text>
                    <ul className="space-y-1 text-sm">
                      <li>• Focus on content and hierarchy</li>
                      <li>• Use subtle hover states</li>
                      <li>• Minimize visual distractions</li>
                      <li>• Support scanning and reading</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 border-2 border-black p-4">
                    <Text className="font-bold mb-2 text-red-700">✗ Avoid:</Text>
                    <ul className="space-y-1 text-sm">
                      <li>• Heavy shadows and transforms</li>
                      <li>• Button-like visual weight</li>
                      <li>• Competing with primary actions</li>
                      <li>• Overwhelming interactive effects</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Advanced Lists */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <BoxedHeading 
                variant="colored" 
                color="bg-orange-100" 
                rotation={1}
                className="mb-8"
              >
                Advanced Patterns
              </BoxedHeading>
              
              <Text className="max-w-3xl mx-auto mb-12">
                Complex list patterns with custom styling, mixed content types, 
                and specialized use cases for advanced interfaces.
              </Text>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Grouped Lists */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <DisplayHeading level={3} size="xl" weight="black" className="mb-6">Grouped Lists</DisplayHeading>
                <div className="space-y-4">
                  <ListContainer>
                    <ListHeading>Recent Files</ListHeading>
                    <ListItem icon={<FileText className="w-4 h-4" />} subtitle="2 hours ago">
                      Project Proposal.docx
                    </ListItem>
                    <ListItem icon={<FileText className="w-4 h-4" />} subtitle="Yesterday">
                      Meeting Notes.md
                    </ListItem>
                  </ListContainer>
                  
                  <ListContainer>
                    <ListHeading>Shared Files</ListHeading>
                    <ListItem icon={<FileText className="w-4 h-4" />} subtitle="Shared by John">
                      Design System.fig
                    </ListItem>
                    <ListItem icon={<FileText className="w-4 h-4" />} subtitle="Shared by Sarah">
                      User Research.pdf
                    </ListItem>
                  </ListContainer>
                </div>
              </motion.div>

              {/* Custom Styled Lists */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <DisplayHeading level={3} size="xl" weight="black" className="mb-6">Custom Styling</DisplayHeading>
                <ListContainer title="Team Members">
                  <ListItem 
                    className="border-l-4 border-green-500 bg-green-50"
                    icon={<User className="w-4 h-4" />}
                    subtitle="Online • Product Manager"
                  >
                    Sarah Johnson
                  </ListItem>
                  <ListItem 
                    className="border-l-4 border-yellow-500 bg-yellow-50"
                    icon={<User className="w-4 h-4" />}
                    subtitle="Away • Designer"
                  >
                    Mike Chen
                  </ListItem>
                  <ListItem 
                    className="border-l-4 border-gray-500 bg-gray-50"
                    icon={<User className="w-4 h-4" />}
                    subtitle="Offline • Developer"
                  >
                    Alex Rivera
                  </ListItem>
                </ListContainer>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}