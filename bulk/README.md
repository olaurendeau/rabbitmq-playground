# Bulk processing

# Play

```
make build
make up
make produce
make consume
```

# Output

```
➜  bulk git:(main) ✗ make produce
docker compose run consumer bin/producer.js
[+] Running 1/0
 ⠿ Container bulk_rabbitmq_1  Running                                                                                                                                                                  0.0s
 [x] Sent 'stale-firefox-87'
 [x] Sent 'blue-swan-7'
 [x] Sent 'afraid-bird-88'
 [x] Sent 'polite-fox-59'
 [x] Sent 'lazy-dodo-93'
 [x] Sent 'great-snail-26'
 [x] Sent 'fast-puma-18'
 [x] Sent 'sour-goat-95'
 [x] Sent 'quick-fly-78'
 [x] Sent 'rotten-bat-97'
 [x] Sent 'calm-eagle-4'
 [x] Sent 'evil-mole-15'
 [x] Sent 'chatty-falcon-36'
 [x] Sent 'clever-ladybug-10'
 [x] Sent 'slippery-jellyfish-49'
 [x] Sent 'honest-badger-72'
 [x] Sent 'hard-rabbit-56'
 [x] Sent 'bright-dog-35'
 [x] Sent 'tame-bulldog-46'
 [x] Sent 'modern-crab-51'
 [x] Sent 'friendly-panther-47'
 [x] Sent 'stupid-quail-21'
 [x] Sent 'hungry-monkey-91'
 [x] Sent 'dangerous-ape-61'
 [x] Sent 'ugly-insect-64'
 [x] Sent 'foolish-stingray-98'
 [x] Sent 'silent-fish-94'
➜  bulk git:(main) ✗ make consume
docker compose run consumer
[+] Running 1/0
 ⠿ Container bulk_rabbitmq_1  Running                                                                                                                                                                  0.0s
[giant-vampirebat-12] [x] Processed (4) 'stale-firefox-87, blue-swan-7, afraid-bird-88, polite-fox-59'
[giant-vampirebat-12] [x] Processed (4) 'lazy-dodo-93, great-snail-26, fast-puma-18, sour-goat-95'
[giant-vampirebat-12] [o] Error ! Nacked (1) quick-fly-78
[giant-vampirebat-12] [x] Processed (4) 'rotten-bat-97, calm-eagle-4, evil-mole-15, quick-fly-78'
[giant-vampirebat-12] [x] Processed (4) 'chatty-falcon-36, clever-ladybug-10, slippery-jellyfish-49, honest-badger-72'
[giant-vampirebat-12] [o] Error ! Nacked (1) hard-rabbit-56
[giant-vampirebat-12] [x] Processed (4) 'bright-dog-35, tame-bulldog-46, modern-crab-51, hard-rabbit-56'
[giant-vampirebat-12] [x] Processed (4) 'friendly-panther-47, stupid-quail-21, hungry-monkey-91, dangerous-ape-61'
[giant-vampirebat-12] [x] Processed (1) 'ugly-insect-64'
[giant-vampirebat-12] [x] Processed (1) 'foolish-stingray-98'
[giant-vampirebat-12] [x] Processed (1) 'silent-fish-94'
```
