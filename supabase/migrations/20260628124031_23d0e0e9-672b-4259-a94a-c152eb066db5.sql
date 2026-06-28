
REVOKE EXECUTE ON FUNCTION public.is_school_member(UUID, UUID) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.has_school_role(UUID, UUID, public.school_role[]) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.can_teach_subject(UUID, UUID) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_school_member(UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_school_role(UUID, UUID, public.school_role[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_teach_subject(UUID, UUID) TO authenticated;
