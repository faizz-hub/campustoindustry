// Shared User Skills & State Management for Campus to Industry
const DEFAULT_SKILLS = ['HTML', 'CSS', 'JavaScript', 'React', 'Git'];
const DEFAULT_ROLE = 'Full Stack Developer';

export const getUserSkills = () => {
  try {
    const saved = localStorage.getItem('elevate_user_skills');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error reading user skills:', e);
  }
  return DEFAULT_SKILLS;
};

export const saveUserSkills = (skills) => {
  try {
    localStorage.setItem('elevate_user_skills', JSON.stringify(skills));
    // Dispatch custom event so other components can reactively update without full reload
    window.dispatchEvent(new CustomEvent('elevate_skills_updated', { detail: skills }));
  } catch (e) {
    console.error('Error saving user skills:', e);
  }
};

export const getTargetRole = () => {
  try {
    const role = localStorage.getItem('elevate_target_role');
    if (role) return role;
  } catch (e) {
    console.error('Error reading target role:', e);
  }
  return DEFAULT_ROLE;
};

export const saveTargetRole = (role) => {
  try {
    localStorage.setItem('elevate_target_role', role);
    window.dispatchEvent(new CustomEvent('elevate_role_updated', { detail: role }));
  } catch (e) {
    console.error('Error saving target role:', e);
  }
};
