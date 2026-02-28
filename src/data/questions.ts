export type Dimension = 'EI' | 'SN' | 'TF' | 'JP' | 'AT';

/**
 * Direction indicates which pole agreeing with this question pushes toward.
 * - 'E','N','T','J','A' = first pole (positive direction)
 * - 'I','S','F','P','Turb' = second pole (negative direction)
 */
export type Direction = 'E' | 'I' | 'N' | 'S' | 'T' | 'F' | 'J' | 'P' | 'A' | 'Turb';

export interface Question {
  id: number;
  text: string;
  dimension: Dimension;
  direction: Direction;
  weight: number;
}

/**
 * All 60 questions from the 16Personalities scoring system.
 *
 * Answer scale: -3 (Strongly Agree) to +3 (Strongly Disagree)
 *
 * Scoring convention:
 *   dir_sign = -1 for first-pole directions (E, N, T, J, A)
 *   dir_sign = +1 for second-pole directions (I, S, F, P, Turb)
 *
 *   raw_score = Σ(answer × dir_sign × weight)
 *   positive raw → first pole (E, N, T, J, A)
 *   negative raw → second pole (I, S, F, P, Turbulent)
 */
export const questions: Question[] = [
  { id: 0, text: 'You regularly make new friends.', dimension: 'EI', direction: 'E', weight: 1 },
  { id: 1, text: 'Complex and novel ideas excite you more than simple and straightforward ones.', dimension: 'SN', direction: 'N', weight: 1 },
  { id: 2, text: 'You usually feel more persuaded by what resonates emotionally with you than by factual arguments.', dimension: 'TF', direction: 'F', weight: 4 },
  { id: 3, text: 'Your living and working spaces are clean and organized.', dimension: 'JP', direction: 'J', weight: 3 },
  { id: 4, text: 'You usually stay calm, even under a lot of pressure.', dimension: 'AT', direction: 'A', weight: 3 },
  { id: 5, text: 'You find the idea of networking or promoting yourself to strangers very daunting.', dimension: 'EI', direction: 'I', weight: 4 },
  { id: 6, text: 'You prioritize and plan tasks effectively, often completing them well before the deadline.', dimension: 'JP', direction: 'J', weight: 3 },
  { id: 7, text: "People's stories and emotions speak louder to you than numbers or data.", dimension: 'TF', direction: 'F', weight: 4 },
  { id: 8, text: 'You like to use organizing tools like schedules and lists.', dimension: 'JP', direction: 'J', weight: 3 },
  { id: 9, text: 'Even a small mistake can cause you to doubt your overall abilities and knowledge.', dimension: 'AT', direction: 'Turb', weight: 3 },
  { id: 10, text: 'You feel comfortable initiating conversations with new people.', dimension: 'EI', direction: 'E', weight: 1 },
  { id: 11, text: 'You tend to worry about how your actions will affect others for a long time after completing a task.', dimension: 'SN', direction: 'S', weight: 4 },
  { id: 12, text: 'Your personal work style is closer to spontaneous bursts of energy than organized and consistent efforts.', dimension: 'TF', direction: 'T', weight: 1 },
  { id: 13, text: 'You often allow the day to unfold without any agenda.', dimension: 'JP', direction: 'P', weight: 3 },
  { id: 14, text: 'You rarely second-guess yourself when making a decision.', dimension: 'AT', direction: 'A', weight: 3 },
  { id: 15, text: 'You enjoy being the center of attention at social gatherings.', dimension: 'EI', direction: 'E', weight: 1 },
  { id: 16, text: 'Cutting-edge gadgets and technology tend to make you feel excited and optimistic about the future.', dimension: 'SN', direction: 'N', weight: 1 },
  { id: 17, text: 'You usually find it difficult to relax when there is an upcoming event that you\'re not sure about.', dimension: 'TF', direction: 'F', weight: 4 },
  { id: 18, text: "It is often difficult for you to relate to other people's feelings.", dimension: 'SN', direction: 'N', weight: 1 },
  { id: 19, text: 'You are not too hard on yourself when you make a mistake.', dimension: 'AT', direction: 'Turb', weight: 3 },
  { id: 20, text: 'Being around people for a long time drains your energy.', dimension: 'EI', direction: 'I', weight: 4 },
  { id: 21, text: 'You often spend so much time thinking about ideas that you lose track of time.', dimension: 'SN', direction: 'S', weight: 4 },
  { id: 22, text: 'Deadlines seem to you to be of relative rather than absolute importance.', dimension: 'TF', direction: 'T', weight: 1 },
  { id: 23, text: 'You like to have a detailed plan before starting any project.', dimension: 'JP', direction: 'J', weight: 3 },
  { id: 24, text: 'Your emotions rarely affect your decisions.', dimension: 'TF', direction: 'T', weight: 1 },
  { id: 25, text: 'You prefer to do your activities alone rather than with others.', dimension: 'EI', direction: 'I', weight: 4 },
  { id: 26, text: 'You find that following a set schedule reduces your productivity.', dimension: 'AT', direction: 'Turb', weight: 3 },
  { id: 27, text: 'It is often difficult for you to see where the storyteller is going when listening to a story.', dimension: 'TF', direction: 'T', weight: 1 },
  { id: 28, text: 'You feel more energetic and motivated after spending time with a few close friends rather than attending a large party.', dimension: 'JP', direction: 'P', weight: 3 },
  { id: 29, text: 'You often find yourself contemplating the nature of things.', dimension: 'SN', direction: 'N', weight: 1 },
  { id: 30, text: 'You enjoy participating in team-based activities.', dimension: 'EI', direction: 'E', weight: 1 },
  { id: 31, text: 'You often feel that people misunderstand your emotions or motives.', dimension: 'SN', direction: 'S', weight: 4 },
  { id: 32, text: 'You find it easy to stay relaxed and focused even when there is some pressure.', dimension: 'TF', direction: 'F', weight: 4 },
  { id: 33, text: 'When given the opportunity, you tend to go with the flow rather than stick to your agenda.', dimension: 'JP', direction: 'P', weight: 3 },
  { id: 34, text: "Receiving criticism doesn't usually bother you much.", dimension: 'AT', direction: 'A', weight: 3 },
  { id: 35, text: 'You feel comfortable just walking up to someone you find interesting and striking up a conversation.', dimension: 'EI', direction: 'E', weight: 1 },
  { id: 36, text: 'You like to have your future planned out as much as possible.', dimension: 'SN', direction: 'N', weight: 1 },
  { id: 37, text: "You often have a hard time understanding other people's feelings.", dimension: 'TF', direction: 'T', weight: 1 },
  { id: 38, text: 'You complete tasks in a timely manner.', dimension: 'JP', direction: 'J', weight: 3 },
  { id: 39, text: 'You feel confident that things will work out for you.', dimension: 'AT', direction: 'A', weight: 3 },
  { id: 40, text: 'You would rather stay at home and read a book than go to a party.', dimension: 'EI', direction: 'I', weight: 4 },
  { id: 41, text: 'You enjoy experimenting with new and unproven approaches.', dimension: 'SN', direction: 'N', weight: 1 },
  { id: 42, text: 'You find it easy to connect with others.', dimension: 'EI', direction: 'E', weight: 1 },
  { id: 43, text: 'You believe that a sense of duty is an important value.', dimension: 'JP', direction: 'J', weight: 3 },
  { id: 44, text: 'You feel very anxious when you receive personal criticism.', dimension: 'AT', direction: 'Turb', weight: 3 },
  { id: 45, text: 'In your opinion, it is sometimes better to do what feels right, rather than what makes logical sense.', dimension: 'SN', direction: 'S', weight: 4 },
  { id: 46, text: 'Your mood can change very quickly.', dimension: 'AT', direction: 'Turb', weight: 3 },
  { id: 47, text: 'You find it difficult to agree with the decisions your group makes, if you disagree with them personally.', dimension: 'TF', direction: 'F', weight: 4 },
  { id: 48, text: 'When planning a trip, you prefer to have only the key goals settled and let the rest work itself out.', dimension: 'JP', direction: 'P', weight: 3 },
  { id: 49, text: 'When you make a mistake, you tend to feel very bad and question your ability.', dimension: 'AT', direction: 'Turb', weight: 3 },
  { id: 50, text: 'You avoid making phone calls in general.', dimension: 'EI', direction: 'I', weight: 4 },
  { id: 51, text: 'You feel that your life lacks a clear direction or purpose.', dimension: 'SN', direction: 'S', weight: 4 },
  { id: 52, text: 'You are drawn to busy and fast-paced environments.', dimension: 'EI', direction: 'E', weight: 1 },
  { id: 53, text: 'You find it easy to empathize with a person whose experiences are very different from yours.', dimension: 'TF', direction: 'F', weight: 4 },
  { id: 54, text: 'You get stressed out fairly easily.', dimension: 'AT', direction: 'Turb', weight: 3 },
  { id: 55, text: 'You take pleasure in putting lots of effort into the work you do.', dimension: 'JP', direction: 'J', weight: 3 },
  { id: 56, text: 'You actively seek out new experiences, even if they may sometimes be risky.', dimension: 'SN', direction: 'N', weight: 1 },
  { id: 57, text: 'You know at first glance how someone is feeling.', dimension: 'TF', direction: 'F', weight: 4 },
  { id: 58, text: 'You tend to procrastinate rather than getting tasks done well before the deadline.', dimension: 'JP', direction: 'P', weight: 3 },
  { id: 59, text: 'You believe that a positive attitude is one of the most important things you can have.', dimension: 'AT', direction: 'A', weight: 3 },
];
