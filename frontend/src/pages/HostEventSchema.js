export const categorySchemas = {
  Hackathon: {
    details: [
      { name: 'team_size_min', label: 'Minimum Team Size', datatype: 'number', required: true, input_type: 'number' },
      { name: 'team_size_max', label: 'Maximum Team Size', datatype: 'number', required: true, input_type: 'number' },
      { name: 'allowed_participants', label: 'Allowed Participants', datatype: 'string', required: true, input_type: 'select', options: ['students', 'professionals', 'all'] },
      { name: 'required_skills', label: 'Required Skills', datatype: 'array', required: false, input_type: 'multiselect', options: ['AI/ML', 'Web Dev', 'App Dev', 'Design', 'Other'] },
      { name: 'problem_statement', label: 'Problem Statement (URL/Description)', datatype: 'string', required: true, input_type: 'text' },
      { name: 'prize_pool', label: 'Prize Pool (₹)', datatype: 'number', required: true, input_type: 'number' },
      { name: 'registration_fee', label: 'Registration Fee (₹)', datatype: 'number', required: false, input_type: 'number' },
      { name: 'mode', label: 'Mode', datatype: 'string', required: true, input_type: 'select', options: ['online', 'offline', 'hybrid'] }
    ],
    eligibility: [
      { name: 'college_name', label: 'College Name (if restricted)', datatype: 'string', required: false, input_type: 'text' },
      { name: 'year', label: 'Years Allowed', datatype: 'array', required: false, input_type: 'multiselect', options: ['1', '2', '3', '4', 'PG'] },
      { name: 'cgpa', label: 'Minimum CGPA', datatype: 'number', required: false, input_type: 'number' },
      { name: 'country_restriction', label: 'Country Restriction', datatype: 'string', required: false, input_type: 'text' }
    ]
  },
  'Cultural Event': {
    details: [
      { name: 'event_type', label: 'Event Type', datatype: 'string', required: true, input_type: 'select', options: ['dance', 'music', 'drama', 'other'] },
      { name: 'participation_type', label: 'Participation Type', datatype: 'string', required: true, input_type: 'select', options: ['solo', 'team'] },
      { name: 'max_participants', label: 'Max Participants', datatype: 'number', required: true, input_type: 'number' },
      { name: 'theme', label: 'Theme', datatype: 'string', required: false, input_type: 'text' },
      { name: 'entry_fee', label: 'Entry Fee (₹)', datatype: 'number', required: false, input_type: 'number' }
    ],
    eligibility: [
      { name: 'age_limit', label: 'Age Limit', datatype: 'number', required: false, input_type: 'number' },
      { name: 'open_to', label: 'Open To', datatype: 'string', required: true, input_type: 'select', options: ['school', 'college', 'public'] }
    ]
  },
  'College Event': {
    details: [
      { name: 'hosting_college_name', label: 'Hosting College Name', datatype: 'string', required: true, input_type: 'text' },
      { name: 'event_type', label: 'Event Type', datatype: 'string', required: true, input_type: 'select', options: ['fest', 'workshop', 'seminar', 'other'] },
      { name: 'department', label: 'Department', datatype: 'string', required: false, input_type: 'text' },
      { name: 'participation_scope', label: 'Participation Scope', datatype: 'string', required: true, input_type: 'select', options: ['intra-college', 'inter-college'] }
    ],
    eligibility: [
      { name: 'college_id_required', label: 'College ID Required', datatype: 'boolean', required: true, input_type: 'boolean' },
      { name: 'allowed_colleges', label: 'Allowed Colleges (Comma Separated)', datatype: 'string', required: false, input_type: 'text' }
    ]
  },
  'Conference': {
    details: [
      { name: 'topics', label: 'Topics (Comma Separated)', datatype: 'array', required: true, input_type: 'text' },
      { name: 'speakers', label: 'Speakers (Comma Separated)', datatype: 'array', required: true, input_type: 'text' },
      { name: 'registration_fee', label: 'Registration Fee (₹)', datatype: 'number', required: false, input_type: 'number' },
      { name: 'max_attendees', label: 'Maximum Attendees', datatype: 'number', required: true, input_type: 'number' }
    ],
    eligibility: [
      { name: 'domain', label: 'Target Domain', datatype: 'string', required: true, input_type: 'select', options: ['students', 'researchers', 'professionals', 'all'] }
    ],
    documents: [
      { name: 'certificate_provided', label: 'Certificate Provided', datatype: 'boolean', required: true, input_type: 'boolean' },
      { name: 'agenda', label: 'Agenda Document', datatype: 'string', required: false, input_type: 'file' }
    ]
  },
  'Course': {
    details: [
      { name: 'instructor_name', label: 'Instructor Name', datatype: 'string', required: true, input_type: 'text' },
      { name: 'duration', label: 'Duration (e.g., 4 weeks)', datatype: 'string', required: true, input_type: 'text' },
      { name: 'level', label: 'Level', datatype: 'string', required: true, input_type: 'select', options: ['beginner', 'intermediate', 'advanced'] },
      { name: 'mode', label: 'Mode', datatype: 'string', required: true, input_type: 'select', options: ['self-paced', 'live'] },
      { name: 'price', label: 'Price (₹)', datatype: 'number', required: false, input_type: 'number' }
    ],
    eligibility: [
      { name: 'prerequisites', label: 'Prerequisites', datatype: 'string', required: false, input_type: 'text' },
      { name: 'required_knowledge', label: 'Required Knowledge', datatype: 'string', required: false, input_type: 'text' }
    ],
    documents: [
      { name: 'certification', label: 'Certification Provided', datatype: 'boolean', required: true, input_type: 'boolean' },
      { name: 'syllabus', label: 'Syllabus', datatype: 'string', required: false, input_type: 'file' }
    ]
  },
  'Scholarship': {
    details: [
      { name: 'scholarship_amount', label: 'Scholarship Amount (₹)', datatype: 'number', required: true, input_type: 'number' },
      { name: 'number_of_seats', label: 'Number of Seats', datatype: 'number', required: true, input_type: 'number' },
      { name: 'provider', label: 'Provider Name', datatype: 'string', required: true, input_type: 'text' }
    ],
    eligibility: [
      { name: 'income_limit', label: 'Income Limit (₹)', datatype: 'number', required: true, input_type: 'number' },
      { name: 'academic_requirement', label: 'Academic Requirement (CGPA or %)', datatype: 'number', required: false, input_type: 'number' },
      { name: 'category', label: 'Scholarship Category', datatype: 'string', required: true, input_type: 'select', options: ['merit-based', 'need-based'] }
    ],
    documents: [
      { name: 'required_documents', label: 'Required Documents List (Comma Separated)', datatype: 'string', required: true, input_type: 'text' }
    ]
  },
  'Competition': {
    details: [
      { name: 'competition_type', label: 'Competition Type', datatype: 'string', required: true, input_type: 'select', options: ['quiz', 'coding', 'case-study', 'other'] },
      { name: 'format', label: 'Format', datatype: 'string', required: true, input_type: 'select', options: ['online', 'offline'] },
      { name: 'prize_details', label: 'Prize Details', datatype: 'string', required: true, input_type: 'text' }
    ],
    eligibility: [
      { name: 'participation_type', label: 'Participation Type', datatype: 'string', required: true, input_type: 'select', options: ['individual', 'team'] },
      { name: 'age_limit', label: 'Age Limit', datatype: 'number', required: false, input_type: 'number' }
    ],
    documents: [
      { name: 'rules', label: 'Rules Document', datatype: 'string', required: true, input_type: 'file' },
      { name: 'rounds', label: 'Number of Rounds', datatype: 'number', required: false, input_type: 'number' }
    ]
  },
  'Internship': {
    details: [
      { name: 'company_name', label: 'Company Name', datatype: 'string', required: true, input_type: 'text' },
      { name: 'role_title', label: 'Role Title', datatype: 'string', required: true, input_type: 'text' },
      { name: 'duration', label: 'Duration (months)', datatype: 'string', required: true, input_type: 'text' },
      { name: 'stipend', label: 'Stipend (₹)', datatype: 'number', required: false, input_type: 'number' },
      { name: 'location', label: 'Location', datatype: 'string', required: true, input_type: 'text' }
    ],
    eligibility: [
      { name: 'skills_required', label: 'Skills Required', datatype: 'array', required: true, input_type: 'multiselect', options: ['React', 'Node', 'Python', 'Java', 'Design'] },
      { name: 'degree', label: 'Degree Required', datatype: 'string', required: false, input_type: 'text' },
      { name: 'year_of_study', label: 'Eligible Year of Study', datatype: 'array', required: false, input_type: 'multiselect', options: ['1', '2', '3', '4', 'PG'] }
    ],
    documents: [
      { name: 'ppo', label: 'PPO (Pre-Placement Offer)', datatype: 'boolean', required: false, input_type: 'boolean' },
      { name: 'work_type', label: 'Work Type', datatype: 'string', required: true, input_type: 'select', options: ['remote', 'on-site', 'hybrid'] }
    ]
  },
  'Loan': {
    details: [
      { name: 'loan_amount', label: 'Loan Amount (₹)', datatype: 'number', required: true, input_type: 'number' },
      { name: 'interest_rate', label: 'Interest Rate (%)', datatype: 'number', required: true, input_type: 'number' },
      { name: 'repayment_duration', label: 'Repayment Duration (Months)', datatype: 'number', required: true, input_type: 'number' }
    ],
    eligibility: [
      { name: 'income', label: 'Income Required (₹)', datatype: 'number', required: true, input_type: 'number' },
      { name: 'employment_status', label: 'Employment Status', datatype: 'string', required: true, input_type: 'select', options: ['employed', 'self-employed', 'student'] },
      { name: 'credit_score', label: 'Required Credit Score', datatype: 'number', required: false, input_type: 'number' }
    ],
    documents: [
      { name: 'required_documents', label: 'Required Documents List (Comma Separated)', datatype: 'string', required: true, input_type: 'text' }
    ]
  }
};
