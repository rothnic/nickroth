import { motion } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useNavigate } from '../utils/router';
import { 
  ArrowLeft, 
  Download, 
  Share, 
  Heart, 
  Plus, 
  Search, 
  Settings, 
  Trash,
  ExternalLink,
  Github,
  Play
} from 'lucide-react';
import { NeoButton } from '../components/demo/NeoButton';
import { IconButton } from '../components/demo/IconButton';
import { StickerBadge } from '../components/StickerBadge';
import { DisplayHeading } from '../components/demo/DisplayHeading';
import { Text } from '../components/demo/Text';

export function ButtonsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <button
              onClick={() => navigate('/demo')}
              className="flex items-center space-x-2 mb-6 text-sm font-mono hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Demo</span>
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-black text-white border-2 border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <Play className="w-6 h-6" />
              </div>
              <div>
                <DisplayHeading level={1} size="3xl" weight="black">
                  Button System
                </DisplayHeading>
                <Text variant="mono" color="muted">
                  Neobrutalist button components with bold shadows and interactions
                </Text>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <StickerBadge color="bg-blue-300" size="sm">
                Interactive
              </StickerBadge>
              <StickerBadge color="bg-yellow-300" size="sm">
                Accessible
              </StickerBadge>
              <StickerBadge color="bg-green-300" size="sm">
                Consistent
              </StickerBadge>
            </div>
          </motion.div>

          {/* Primary Buttons Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="bg-yellow-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 transform -rotate-1 mb-8">
              <DisplayHeading level={2} size="2xl" weight="black" className="mb-6">
                NeoButton Variants
              </DisplayHeading>
              
              <div className="grid gap-8">
                <div>
                  <Text variant="mono" size="sm" color="muted" className="mb-4">
                    Button Variants
                  </Text>
                  <div className="flex flex-wrap gap-4">
                    <NeoButton variant="primary">
                      Primary
                    </NeoButton>
                    <NeoButton variant="secondary">
                      Secondary
                    </NeoButton>
                    <NeoButton variant="outline">
                      Outline
                    </NeoButton>
                    <NeoButton variant="destructive">
                      Destructive
                    </NeoButton>
                    <NeoButton variant="ghost">
                      Ghost
                    </NeoButton>
                  </div>
                </div>

                <div>
                  <Text variant="mono" size="sm" color="muted" className="mb-4">
                    Button Sizes
                  </Text>
                  <div className="flex flex-wrap items-center gap-4">
                    <NeoButton size="sm" variant="primary">
                      Small
                    </NeoButton>
                    <NeoButton size="md" variant="primary">
                      Medium
                    </NeoButton>
                    <NeoButton size="lg" variant="primary">
                      Large
                    </NeoButton>
                  </div>
                </div>

                <div>
                  <Text variant="mono" size="sm" color="muted" className="mb-4">
                    Shadow Sizes
                  </Text>
                  <div className="flex flex-wrap items-center gap-4">
                    <NeoButton shadowSize="sm" variant="primary">
                      Small Shadow
                    </NeoButton>
                    <NeoButton shadowSize="md" variant="primary">
                      Medium Shadow
                    </NeoButton>
                    <NeoButton shadowSize="lg" variant="primary">
                      Large Shadow
                    </NeoButton>
                  </div>
                </div>

                <div>
                  <Text variant="mono" size="sm" color="muted" className="mb-4">
                    With Icons
                  </Text>
                  <div className="flex flex-wrap gap-4">
                    <NeoButton leftIcon={<Download className="w-4 h-4" />}>
                      Download
                    </NeoButton>
                    <NeoButton rightIcon={<ExternalLink className="w-4 h-4" />} variant="secondary">
                      View Project
                    </NeoButton>
                    <NeoButton 
                      leftIcon={<Github className="w-4 h-4" />}
                      rightIcon={<ExternalLink className="w-4 h-4" />}
                      variant="outline"
                    >
                      GitHub
                    </NeoButton>
                  </div>
                </div>

                <div>
                  <Text variant="mono" size="sm" color="muted" className="mb-4">
                    States
                  </Text>
                  <div className="flex flex-wrap gap-4">
                    <NeoButton>
                      Normal
                    </NeoButton>
                    <NeoButton disabled>
                      Disabled
                    </NeoButton>
                    <NeoButton isLoading>
                      Loading
                    </NeoButton>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Icon Buttons Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="bg-cyan-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 transform rotate-1 mb-8">
              <DisplayHeading level={2} size="2xl" weight="black" className="mb-6">
                Icon Buttons
              </DisplayHeading>
              
              <div className="grid gap-8">
                <div>
                  <Text variant="mono" size="sm" color="muted" className="mb-4">
                    Icon Button Variants
                  </Text>
                  <div className="flex flex-wrap gap-4">
                    <IconButton icon={<Heart className="w-4 h-4" />} variant="primary" />
                    <IconButton icon={<Share className="w-4 h-4" />} variant="secondary" />
                    <IconButton icon={<Search className="w-4 h-4" />} variant="outline" />
                    <IconButton icon={<Trash className="w-4 h-4" />} variant="destructive" />
                  </div>
                </div>

                <div>
                  <Text variant="mono" size="sm" color="muted" className="mb-4">
                    Icon Button Sizes
                  </Text>
                  <div className="flex flex-wrap items-center gap-4">
                    <IconButton icon={<Plus className="w-3 h-3" />} size="sm" />
                    <IconButton icon={<Plus className="w-4 h-4" />} size="md" />
                    <IconButton icon={<Plus className="w-5 h-5" />} size="lg" />
                  </div>
                </div>

                <div>
                  <Text variant="mono" size="sm" color="muted" className="mb-4">
                    Icon Button Shapes
                  </Text>
                  <div className="flex flex-wrap gap-4">
                    <IconButton icon={<Settings className="w-4 h-4" />} shape="square" />
                    <IconButton icon={<Settings className="w-4 h-4" />} shape="circle" />
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Rotated Buttons Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="bg-lime-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 transform -rotate-1">
              <DisplayHeading level={2} size="2xl" weight="black" className="mb-6">
                Sticker Style (Rotated)
              </DisplayHeading>
              
              <div className="flex flex-wrap gap-6 items-center">
                <NeoButton rotation={-3} variant="primary">
                  Tilted Left
                </NeoButton>
                <NeoButton rotation={2} variant="secondary">
                  Tilted Right
                </NeoButton>
                <NeoButton rotation={-5} variant="outline" leftIcon={<Heart className="w-4 h-4" />}>
                  Sticker Style
                </NeoButton>
                <IconButton icon={<Plus className="w-4 h-4" />} rotation={4} />
              </div>
            </div>
          </motion.section>

          {/* Real-World Examples */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-fuchsia-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 transform rotate-1">
              <DisplayHeading level={2} size="2xl" weight="black" className="mb-6">
                Real-World Usage
              </DisplayHeading>
              
              <div className="grid gap-6">
                {/* Card with buttons */}
                <div className="bg-white border-2 border-black p-6">
                  <DisplayHeading level={3} size="lg" weight="semibold" className="mb-2">
                    Project Card Actions
                  </DisplayHeading>
                  <Text className="mb-4">
                    This is how buttons look when composed into cards and other components.
                  </Text>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <IconButton 
                        icon={<Github className="w-4 h-4" />} 
                        variant="primary" 
                        tooltip="View on GitHub"
                      />
                      <IconButton 
                        icon={<ExternalLink className="w-4 h-4" />} 
                        variant="secondary"
                        tooltip="Live Demo"
                      />
                    </div>
                    <NeoButton size="sm" variant="outline">
                      Learn More
                    </NeoButton>
                  </div>
                </div>

                {/* Form with buttons */}
                <div className="bg-white border-2 border-black p-6">
                  <DisplayHeading level={3} size="lg" weight="semibold" className="mb-4">
                    Form Actions
                  </DisplayHeading>
                  <div className="flex flex-wrap gap-3">
                    <NeoButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
                      Create New
                    </NeoButton>
                    <NeoButton variant="secondary">
                      Save Draft
                    </NeoButton>
                    <NeoButton variant="outline">
                      Cancel
                    </NeoButton>
                    <NeoButton variant="destructive" size="sm">
                      Delete
                    </NeoButton>
                  </div>
                </div>

                {/* Toolbar with icon buttons */}
                <div className="bg-white border-2 border-black p-4">
                  <DisplayHeading level={3} size="lg" weight="semibold" className="mb-4">
                    Toolbar Actions
                  </DisplayHeading>
                  <div className="flex items-center space-x-2">
                    <IconButton icon={<Plus className="w-4 h-4" />} size="sm" />
                    <IconButton icon={<Search className="w-4 h-4" />} size="sm" variant="outline" />
                    <IconButton icon={<Settings className="w-4 h-4" />} size="sm" variant="outline" />
                    <div className="w-px h-6 bg-gray-300 mx-2" />
                    <IconButton icon={<Heart className="w-4 h-4" />} size="sm" variant="secondary" />
                    <IconButton icon={<Share className="w-4 h-4" />} size="sm" variant="secondary" />
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}