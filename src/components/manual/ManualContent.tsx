import React, { useState } from 'react';
import { cn } from '../../utils/cn';

const sections = [
  { id: 'basic', title: '01 - BASIC PROTOCOL' },
  { id: 'indicators', title: '02 - BOMB IDENTIFICATION & INDICATORS' },
  { id: 'strikes', title: '03 - STRIKE SYSTEM' },
  { id: 'wire', title: '04 - WIRE GRID' },
  { id: 'logic', title: '05 - LOGIC PANEL' },
  { id: 'symbol', title: '06 - SYMBOL SEQUENCE' },
  { id: 'memory', title: '07 - MEMORY CORE' },
  { id: 'master', title: '08 - MASTER SHUTDOWN' },
];

export const ManualContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState('basic');

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-obsidian text-gray-300 font-sans border-2 border-gunmetal rounded-sm shadow-2xl overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gunmetal bg-[#111318] p-4 overflow-y-auto">
        <h2 className="text-xl font-display text-emerald tracking-widest uppercase mb-6 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">Defusal Manual</h2>
        <nav className="flex flex-col gap-2">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={cn(
                "text-left px-3 py-2 text-sm font-mono transition-colors rounded-sm",
                activeSection === s.id ? "bg-emerald/10 text-emerald border-l-2 border-emerald" : "hover:bg-gunmetal hover:text-white border-l-2 border-transparent"
              )}
            >
              {s.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto bg-obsidian">
        {activeSection === 'basic' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-display text-white uppercase border-b border-gunmetal pb-4">01 - Basic Protocol</h1>
            <p>You are dealing with a highly advanced electronic security device.</p>
            <p className="text-amber font-mono bg-amber/10 border border-amber/20 p-4 rounded-sm">
              Your objective is to deactivate all four modules before the countdown reaches zero.
            </p>
            <p>Follow this manual exactly. Do not guess. Every incorrect action increases the strike count and may result in immediate protocol failure.</p>
          </div>
        )}

        {activeSection === 'indicators' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-display text-white uppercase border-b border-gunmetal pb-4">02 - Identification & Indicators</h1>
            
            <h3 className="text-xl font-display text-white mt-8">Serial Number</h3>
            <p>Every device has a unique serial number (e.g. K7-42-X9). Some puzzle rules require information from the serial number.</p>
            
            <h3 className="text-xl font-display text-white mt-8">Indicators</h3>
            <p>The bomb contains three indicators: <strong>PWR</strong>, <strong>ARM</strong>, and <strong>SYS</strong>.</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 font-mono text-sm text-gray-400">
              <li>OFF (Dark)</li>
              <li className="text-emerald">GREEN (Active)</li>
              <li className="text-crimson">RED (Warning)</li>
            </ul>
          </div>
        )}

        {activeSection === 'strikes' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-display text-white uppercase border-b border-gunmetal pb-4">03 - Strike System</h1>
            <p>Mistakes are penalized according to the strike system. Maximum strikes: 3.</p>
            
            <div className="space-y-4 font-mono text-sm mt-6">
              <div className="p-4 border border-gunmetal bg-gray-900 rounded-sm">
                <span className="text-amber">STRIKE 1</span>: Incorrect action detected. Timer continues normally.
              </div>
              <div className="p-4 border border-amber/30 bg-amber/10 rounded-sm">
                <span className="text-amber font-bold">STRIKE 2</span>: TIME PENALTY: -20 SECONDS.
              </div>
              <div className="p-4 border border-crimson/30 bg-crimson/10 rounded-sm">
                <span className="text-crimson font-bold">STRIKE 3</span>: SYSTEM FAILURE. Immediate defusal failure.
              </div>
            </div>
          </div>
        )}

        {activeSection === 'wire' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-display text-white uppercase border-b border-gunmetal pb-4">04 - Wire Grid</h1>
            <p>The Wire Grid module displays between 4 and 6 colored wires. Identify the number of wires to determine the correct rule set.</p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-emerald font-mono mb-2 border-b border-gunmetal pb-1">RULE A: 4 WIRES</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>If there is a RED wire and the Serial Number contains a vowel (A, E, I, O, U), cut the last RED wire.</li>
                  <li>Otherwise, if there are no BLUE wires, cut the first wire.</li>
                  <li>Otherwise, cut the last wire.</li>
                </ol>
              </div>

              <div>
                <h3 className="text-emerald font-mono mb-2 border-b border-gunmetal pb-1">RULE B: 5 WIRES</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>If the <strong>ARM</strong> indicator is GREEN:
                    <ul className="list-disc pl-6 mt-2">
                      <li>If the Serial Number contains '7' and there is at least one RED wire, cut the second RED wire (or the first if only one exists).</li>
                      <li>Otherwise, cut the YELLOW wire (first one if multiple, or last wire if none exist).</li>
                    </ul>
                  </li>
                  <li>If the <strong>ARM</strong> indicator is NOT GREEN:
                    <ul className="list-disc pl-6 mt-2">
                      <li>If there is a BLACK wire, cut the first wire.</li>
                      <li>Otherwise, cut the second wire.</li>
                    </ul>
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-emerald font-mono mb-2 border-b border-gunmetal pb-1">RULE C: 6 WIRES</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>If there are no RED wires, cut the fourth wire.</li>
                  <li>Otherwise, if the <strong>PWR</strong> indicator is GREEN, cut the fifth wire.</li>
                  <li>Otherwise, cut the first wire.</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'logic' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-display text-white uppercase border-b border-gunmetal pb-4">05 - Logic Panel</h1>
            <p>The Logic Panel displays a 3x3 grid of numbers. Based on internal logic checks, the bomb chooses one of five rules. As an operative, you cannot know which rule was chosen, but only ONE rule will have a valid solution.</p>
            <p className="text-amber text-sm font-mono">Wait, standard defusal protocol dictates that the bomb selects a specific rule based on internal algorithms not documented here. Just kidding, the module simply expects one of these sequences. Actually, the module internally selects a rule and generates exactly one sequence.</p>
            <p className="font-bold">Wait, in this simulation, the rules are simplified. The correct answer is ALWAYS one of the following five sequences. You must figure out which one is valid based on the numbers presented. (Note: only one of these rule outputs is considered the unique solution by the bomb logic).</p>
            
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>RULE A:</strong> Select the top-left number, then the bottom-right number, then the center number.</li>
              <li><strong>RULE B:</strong> Select the smallest odd number, followed by the largest even number.</li>
              <li><strong>RULE C:</strong> Select the largest number, followed by the smallest number.</li>
              <li><strong>RULE D:</strong> Select the three numbers in the center row from left to right.</li>
              <li><strong>RULE E:</strong> Select the four corner numbers in clockwise order starting from top-left.</li>
            </ul>
          </div>
        )}

        {activeSection === 'symbol' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-display text-white uppercase border-b border-gunmetal pb-4">06 - Symbol Sequence</h1>
            <p>Four symbols will be displayed on the module. Find the single group below that contains ALL FOUR symbols.</p>
            <p>Select the symbols on the bomb in the exact order they appear in their matching group (from left to right).</p>

            <div className="space-y-4 font-mono text-2xl mt-8 bg-gray-900 p-6 rounded-sm border border-gunmetal">
              <div className="flex gap-4 items-center">
                <span className="text-sm text-gray-500 w-24">GROUP 1:</span>
                <span>Ϙ Ѭ Ҩ Ѯ Ӝ Җ</span>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-sm text-gray-500 w-24">GROUP 2:</span>
                <span>Ӭ Ѫ Ҵ Ӷ Ϙ Ѯ</span>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-sm text-gray-500 w-24">GROUP 3:</span>
                <span>Ӻ Ԇ Ѭ Җ Ӭ Ҵ</span>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'memory' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-display text-white uppercase border-b border-gunmetal pb-4">07 - Memory Core</h1>
            <p>The Memory Core consists of a display screen and four buttons labeled 1-4. The module requires passing 3 consecutive rounds. A strike resets the module back to Round 1.</p>
            
            <div className="space-y-6 mt-6">
              <div>
                <h3 className="text-emerald font-mono mb-2 border-b border-gunmetal pb-1">ROUND 1</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>If the display is 1: Press button with label 2.</li>
                  <li>If the display is 2: Press button with label 2.</li>
                  <li>If the display is 3: Press button with label 3.</li>
                  <li>If the display is 4: Press button with label 4.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-emerald font-mono mb-2 border-b border-gunmetal pb-1">ROUND 2</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>If the display is 1: Press button with label 4.</li>
                  <li>If the display is 2: Press button you pressed in Round 1.</li>
                  <li>If the display is 3: Press button with label 1.</li>
                  <li>If the display is 4: Press button you pressed in Round 1.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-emerald font-mono mb-2 border-b border-gunmetal pb-1">ROUND 3</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>If the display is 1: Press button you pressed in Round 2.</li>
                  <li>If the display is 2: Press button you pressed in Round 1.</li>
                  <li>If the display is 3: Press button with label 3.</li>
                  <li>If the display is 4: Press button with label 4.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'master' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-display text-white uppercase border-b border-gunmetal pb-4">08 - Master Shutdown</h1>
            <p>Once all 4 auxiliary modules are disabled, the Master Shutdown protocol becomes available.</p>
            <p className="text-emerald font-mono bg-emerald/10 border border-emerald/20 p-4 rounded-sm mt-4">
              Enter the valid <strong>Master Override Code</strong> provided physically by your gamemaster and press <strong>EXECUTE</strong>. An incorrect code will result in a strike.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
